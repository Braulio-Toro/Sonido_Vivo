import { IMAGEN_POR_DEFECTO } from '../data/productos';

export const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function filtrarProductos(productos, { categoria = '', busqueda = '' } = {}) {
  const texto = busqueda.trim().toLowerCase();
  return productos.filter(
    (p) => (!categoria || p.categoria === categoria) && (!texto || p.nombre.toLowerCase().includes(texto))
  );
}

export function crearProducto(datos, existentes = []) {
  const base = slug(datos.nombre);
  const id = existentes.some((p) => p.id === base) ? `${base}-${Date.now()}` : base;
  return {
    id,
    codigo: `SV-${datos.categoria.slice(0, 3).toUpperCase()}-${String(existentes.length + 1).padStart(3, '0')}`,
    imagen: IMAGEN_POR_DEFECTO, // imagen genérica: no se suben archivos
    ...datos,
    precio: Number(datos.precio),
    stock: Number(datos.stock),
  };
}
