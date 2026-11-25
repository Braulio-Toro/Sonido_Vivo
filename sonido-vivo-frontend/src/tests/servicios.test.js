import { describe, it, expect, beforeEach } from 'vitest';
import api from '../services/api';
import ProductosService from '../services/ProductosService';
import AuthService from '../services/AuthService';

// Adaptador falso de axios: captura la petición real (URL, método, cabeceras, cuerpo) sin tocar la red.
let ultima;
beforeEach(() => {
  ultima = null;
  localStorage.clear();
  api.defaults.adapter = async (config) => {
    ultima = config;
    return { data: { ok: true }, status: 200, statusText: 'OK', headers: {}, config };
  };
});

describe('capa de servicios (axios)', () => {
  it('GET /api/productos apunta al backend', async () => {
    await ProductosService.getAllProductos();
    expect(ultima.method).toBe('get');
    expect(`${ultima.baseURL}${ultima.url}`).toBe('http://localhost:8080/api/productos');
    expect(ultima.headers.Authorization).toBeUndefined();
  });
  it('adjunta el token JWT cuando hay sesión', async () => {
    localStorage.setItem('token', 'abc.def.ghi');
    await ProductosService.createProducto({ nombre: 'X' });
    expect(ultima.method).toBe('post');
    expect(ultima.headers.Authorization).toBe('Bearer abc.def.ghi');
  });
  it('login envía correo y password a /auth/login', async () => {
    await AuthService.login('admin@duoc.cl', 'admin123');
    expect(ultima.url).toBe('/auth/login');
    expect(JSON.parse(ultima.data)).toEqual({ correo: 'admin@duoc.cl', password: 'admin123' });
  });
  it('PUT y DELETE usan el id en la ruta', async () => {
    await ProductosService.updateProducto(5, { nombre: 'Y' });
    expect(ultima.method).toBe('put');
    expect(ultima.url).toBe('/productos/5');
    await ProductosService.deleteProducto(5);
    expect(ultima.method).toBe('delete');
  });
});
