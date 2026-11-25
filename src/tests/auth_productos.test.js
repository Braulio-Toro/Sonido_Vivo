import { describe, it, expect } from 'vitest';
import { autenticar } from '../utils/auth';
import { filtrarProductos, crearProducto } from '../utils/productos';
import { validarProducto } from '../utils/validaciones';
import { IMAGEN_POR_DEFECTO } from '../data/productos';

const catalogo = [
  { id: 'a', nombre: 'Bajo Fender', categoria: 'Bajos' },
  { id: 'b', nombre: 'Bajo Kaysen', categoria: 'Bajos' },
  { id: 'c', nombre: 'Micrófono vocal', categoria: 'Micrófonos' },
];

describe('autenticación', () => {
  it('autentica credenciales estáticas válidas sin exponer la contraseña', () => {
    const usuario = autenticar('admin@duoc.cl', 'admin123');
    expect(usuario.rol).toBe('admin');
    expect(usuario.pass).toBeUndefined();
  });

  it('rechaza credenciales incorrectas', () => {
    const usuario = autenticar('admin@duoc.cl', 'mala');
    expect(usuario).toBeNull();
  });
});

describe('catálogo', () => {
  it('filtra por categoría y por texto', () => {
    const bajos = filtrarProductos(catalogo, { categoria: 'Bajos' });
    const buscados = filtrarProductos(catalogo, { busqueda: 'kaysen' });
    expect(bajos).toHaveLength(2);
    expect(buscados.map((p) => p.id)).toEqual(['b']);
  });

  it('crea un producto con imagen genérica y precio numérico', () => {
    const datos = { nombre: 'Cejilla Pro', categoria: 'Accesorios', marca: 'X', precio: '9990', stock: '5', descripcion: 'd' };
    const nuevo = crearProducto(datos, catalogo);
    expect(nuevo.imagen).toBe(IMAGEN_POR_DEFECTO);
    expect(nuevo.precio).toBe(9990);
    expect(nuevo.id).toBe('cejilla-pro');
  });

  it('valida el formulario de producto (precio y stock numéricos)', () => {
    const malo = { nombre: 'Ab', categoria: '', marca: '', precio: '-5', stock: 'x', descripcion: '' };
    const errores = validarProducto(malo);
    expect(Object.keys(errores)).toHaveLength(6);
  });
});