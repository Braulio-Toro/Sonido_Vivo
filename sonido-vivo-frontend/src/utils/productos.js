import { IMAGEN_POR_DEFECTO } from '../data/productos';

export const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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

// Código SV-XXX-NNN siguiente para una categoría (evita choques con el UNIQUE del backend aunque se borren productos).
export function siguienteCodigo(categoria, existentes = []) {
  const prefijo = `SV-${categoria.slice(0, 3).toUpperCase()}-`;
  const maximo = existentes
    .filter((p) => typeof p.codigo === 'string' && p.codigo.startsWith(prefijo))
    .reduce((m, p) => Math.max(m, parseInt(p.codigo.slice(prefijo.length), 10) || 0), 0);
  return `${prefijo}${String(maximo + 1).padStart(3, '0')}`;
}
