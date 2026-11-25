import { describe, it, expect } from 'vitest';
import {
  extraerLista, productoDesdeApi, productoHaciaApi, usuarioDesdeApi, registroHaciaApi,
  ventaHaciaApi, tokenVigente, mensajeDeError,
} from '../utils/api';
import { siguienteCodigo } from '../utils/productos';
import { IMAGEN_POR_DEFECTO, PRODUCTOS_INICIALES } from '../data/productos';

const hal = {
  _embedded: { productoList: [{ id: 7, codigo: 'SV-GTR-001', nombre: 'Fender', categoria: 'Guitarras', marca: 'Fender', precio: 899990, stock: 5, descripcion: 'd', _links: {} }] },
  _links: { self: { href: 'http://localhost:8080/api/productos' } },
};

describe('respuestas HATEOAS del backend', () => {
  it('extrae la lista desde _embedded', () => {
    expect(extraerLista(hal)).toHaveLength(1);
  });
  it('devuelve lista vacía si no hay _embedded o si ya es un arreglo', () => {
    expect(extraerLista({ _links: {} })).toEqual([]);
    expect(extraerLista([1, 2])).toEqual([1, 2]);
  });
});

describe('mapeo de productos', () => {
  it('convierte el id numérico a texto y asigna la imagen local por código', () => {
    const p = productoDesdeApi(extraerLista(hal)[0]);
    expect(p.id).toBe('7');
    expect(p.imagen).toBe(PRODUCTOS_INICIALES[0].imagen);
  });
  it('usa la imagen genérica si el código no tiene imagen local', () => {
    expect(productoDesdeApi({ id: 1, codigo: 'SV-XXX-999', precio: 1, stock: 1 }).imagen).toBe(IMAGEN_POR_DEFECTO);
  });
  it('arma el cuerpo para POST/PUT con números', () => {
    const body = productoHaciaApi({ nombre: ' A ', categoria: 'Bajos', marca: 'M', precio: '100', stock: '2', descripcion: 'x' }, 'SV-BAJ-003');
    expect(body).toEqual({ codigo: 'SV-BAJ-003', nombre: 'A', categoria: 'Bajos', marca: 'M', precio: 100, stock: 2, descripcion: 'x' });
  });
  it('calcula el siguiente código sin repetir aunque se hayan borrado productos', () => {
    const existentes = [{ codigo: 'SV-BAJ-001' }, { codigo: 'SV-BAJ-004' }];
    expect(siguienteCodigo('Bajos', existentes)).toBe('SV-BAJ-005');
    expect(siguienteCodigo('Guitarras', existentes)).toBe('SV-GUI-001');
  });
});

describe('mapeo de usuarios y ventas', () => {
  it('usuarioDesdeApi usa los nombres del frontend', () => {
    const u = usuarioDesdeApi({ id: 1, nombre: 'A', rut: '1', correo: 'a@duoc.cl', telefono: null, fechaNacimiento: '2000-01-01', instrumento: 'Bajo', nivel: null, rol: 'admin' });
    expect(u).toMatchObject({ fono: '', fenac: '2000-01-01', nivel: '', rol: 'admin' });
  });
  it('registroHaciaApi envía teléfono null cuando está vacío y renombra campos', () => {
    const b = registroHaciaApi({ nombre: 'A', rut: '19011022K', correo: 'a@gmail.com', fono: '', fenac: '2000-01-01', instrumento: 'Bajo', nivel: 'Inicial', pass: '1234' });
    expect(b.telefono).toBeNull();
    expect(b.fechaNacimiento).toBe('2000-01-01');
    expect(b.password).toBe('1234');
    expect(b).not.toHaveProperty('pass');
  });
  it('ventaHaciaApi convierte ids a número', () => {
    const v = ventaHaciaApi({ clienteId: '3', item: { id: '9', cantidad: 2 }, total: 500, cupon: '' });
    expect(v).toEqual({ clienteId: 3, productoId: 9, cantidad: 2, cuponCodigo: null, total: 500, estado: 'PAGADO' });
  });
});

describe('JWT y errores', () => {
  const token = (exp) => `x.${btoa(JSON.stringify({ exp }))}.y`;
  it('reconoce tokens vigentes y vencidos', () => {
    expect(tokenVigente(token(Math.floor(Date.now() / 1000) + 600))).toBe(true);
    expect(tokenVigente(token(Math.floor(Date.now() / 1000) - 600))).toBe(false);
    expect(tokenVigente('basura')).toBe(false);
  });
  it('traduce errores del backend a mensajes legibles', () => {
    expect(mensajeDeError({})).toMatch(/No se pudo conectar/);
    expect(mensajeDeError({ response: { status: 403, data: {} } })).toMatch(/permisos/);
    expect(mensajeDeError({ response: { status: 409, data: { detail: 'El correo ya está registrado' } } })).toBe('El correo ya está registrado');
    expect(mensajeDeError({ response: { status: 400, data: { precio: 'El precio debe ser mayor a 0' } } })).toBe('El precio debe ser mayor a 0');
  });
});
