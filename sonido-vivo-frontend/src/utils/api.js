import { IMAGEN_POR_CODIGO, IMAGEN_POR_DEFECTO } from '../data/productos';

// ---- Respuestas HATEOAS (HAL): { _embedded: { productoList: [...] }, _links } ----
export function extraerLista(data) {
  if (Array.isArray(data)) return data;
  const embebido = data?._embedded;
  if (!embebido) return [];
  const primera = Object.values(embebido)[0];
  return Array.isArray(primera) ? primera : [];
}

// ---- Producto: backend (id numérico, sin imagen local)  <->  frontend (id texto, imagen importada) ----
export function productoDesdeApi(p) {
  return {
    id: String(p.id),
    codigo: p.codigo,
    nombre: p.nombre,
    categoria: p.categoria,
    marca: p.marca,
    precio: Number(p.precio),
    stock: Number(p.stock),
    descripcion: p.descripcion,
    imagen: IMAGEN_POR_CODIGO[p.codigo] || IMAGEN_POR_DEFECTO,
  };
}

export function productoHaciaApi(datos, codigo) {
  return {
    codigo,
    nombre: datos.nombre.trim(),
    categoria: datos.categoria,
    marca: datos.marca.trim(),
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    descripcion: datos.descripcion.trim(),
  };
}

// ---- Usuario ----

export function usuarioDesdeApi(u) {
  return {
    id: u.id,
    nombre: u.nombre,
    rut: u.rut,
    correo: u.correo,
    fono: u.telefono || '',
    fenac: u.fechaNacimiento || '',
    instrumento: u.instrumento,
    nivel: u.nivel || '',
    rol: (u.rol || '').replace(/^ROLE_/i, '').toLowerCase(),
  };
}


export function registroHaciaApi(d) {
  return {
    rut: d.rut.trim(),
    nombre: d.nombre.trim(),
    correo: d.correo.trim(),
    telefono: d.fono && d.fono.trim() ? d.fono.trim() : null, // opcional: null, nunca ''
    fechaNacimiento: d.fenac,
    instrumento: d.instrumento,
    nivel: d.nivel,
    password: d.pass,
  };
}

// ---- Venta (una línea por producto del carrito) ----
export function ventaHaciaApi({ clienteId, item, total, cupon }) {
  return {
    clienteId: Number(clienteId),
    productoId: Number(item.id),
    cantidad: item.cantidad,
    cuponCodigo: cupon || null,
    total,
    estado: 'PAGADO',
  };
}

// ---- JWT ----
export function tokenVigente(token, ahora = Date.now()) {
  try {
    const carga = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(carga));
    return typeof exp === 'number' && exp * 1000 > ahora;
  } catch {
    return false;
  }
}

// ---- Mensaje legible para el usuario a partir de un error de axios ----
export function mensajeDeError(error, porDefecto = 'Ocurrió un error inesperado.') {
  if (!error?.response) {
    return 'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.';
  }
  const { status, data } = error.response;
  if (status === 403) return 'No tienes permisos para realizar esta acción.';
  if (status === 401) return data?.error || 'Tu sesión no es válida. Inicia sesión nuevamente.';
  if (typeof data === 'string' && data) return data;
  if (data?.detail) return data.detail;
  if (data?.error) return data.error;
  // Errores de validación: { campo: "mensaje" }
  const mensajes = data && typeof data === 'object' ? Object.values(data).filter((v) => typeof v === 'string') : [];
  return mensajes.length ? mensajes.join(' ') : porDefecto;
}
