const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const REGEX_RUT = /^[0-9]{7,8}[0-9kK]$/;
const REGEX_CORREO = /^[a-zA-Z0-9._%+-]+@(gmail\.com|duoc\.cl|profesor\.duoc\.cl)$/;
const REGEX_FONO = /^\+569[0-9]{8}$/;

// ---- Bloqueo en tiempo real (equivale a los listeners "input") ----
export const soloLetras = (v) => v.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
export const soloRut = (v) => v.replace(/[^0-9kK]/g, '');
export function limpiarFono(v) {
  let limpio = v.replace(/[^0-9+]/g, '');
  if (limpio.lastIndexOf('+') > 0) limpio = limpio.charAt(0) + limpio.slice(1).replace(/\+/g, '');
  return limpio;
}

// ---- Validaciones: devuelven '' si es válido o el mensaje de error ----
export const validarNombre = (v) =>
  REGEX_NOMBRE.test(v.trim()) ? '' : 'El nombre debe contener solo letras y espacios.';

export const validarRut = (v) =>
  REGEX_RUT.test(v.trim()) ? '' : 'El RUT debe ser sin puntos ni guion (Ej: 19011022K o 190110229).';

export const validarCorreo = (v) =>
  REGEX_CORREO.test(v.trim()) ? '' : 'El correo debe ser válido y terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl';

export const validarFono = (v) => {
  if (v.trim() === '') return ''; // opcional
  return REGEX_FONO.test(v.trim()) ? '' : 'El teléfono debe empezar por +569 y tener 8 dígitos adicionales (Ej: +56912345678).';
};

export function calcularEdad(fecha, hoy = new Date()) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  let edad = hoy.getFullYear() - anio;
  const mesDiff = hoy.getMonth() + 1 - mes;
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < dia)) edad--;
  return edad;
}

export function validarFechaNacimiento(fecha, hoy = new Date()) {
  if (!fecha) return 'Por favor, ingresa tu fecha de nacimiento.';
  return calcularEdad(fecha, hoy) < 18 ? 'Debes ser mayor de edad (18 años o más) para registrarte.' : '';
}

export const validarPassword = (v) =>
  v.length < 4 || v.length > 10 ? 'La contraseña debe tener entre 4 y 10 caracteres.' : '';

export const validarConfirmacion = (p1, p2) => (p1 !== p2 ? 'Las contraseñas no coinciden.' : '');

const requerido = (v, msg) => (!v || String(v).trim() === '' ? msg : '');

// ---- Validadores de formulario completo (devuelven un objeto solo con los errores) ----
function compactar(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, msg]) => msg));
}

export function validarRegistro(v) {
  return compactar({
    nombre: validarNombre(v.nombre),
    rut: validarRut(v.rut),
    correo: validarCorreo(v.correo),
    fono: validarFono(v.fono),
    fenac: validarFechaNacimiento(v.fenac),
    instrumento: requerido(v.instrumento, 'Selecciona tu instrumento principal.'),
    nivel: requerido(v.nivel, 'Selecciona tu nivel de experiencia.'),
    pass: validarPassword(v.pass),
    pass2: validarConfirmacion(v.pass, v.pass2),
  });
}

export function validarLogin(v) {
  return compactar({
    correo: validarCorreo(v.correo),
    password: requerido(v.password, 'Ingresa tu contraseña.'),
  });
}

export function validarContacto(v) {
  const nombre = v.nombreContacto.trim();
  const correo = v.correoContacto.trim();
  const msg = v.comentario.trim();
  return compactar({
    nombreContacto: nombre === '' || nombre.length > 100 ? 'El nombre es obligatorio y debe tener máximo 100 caracteres.' : '',
    correoContacto: correo !== '' && (correo.length > 100 || validarCorreo(correo)) ? 'El correo debe ser válido y terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl' : '',
    motivo: requerido(v.motivo, 'Selecciona el motivo de tu consulta.'),
    comentario: msg === '' ? 'Por favor, escribe tu mensaje.' : msg.length > 500 ? 'El mensaje no puede superar los 500 caracteres.' : '',
  });
}

export function validarProducto(v) {
  const nombre = v.nombre.trim();
  const desc = v.descripcion.trim();
  return compactar({
    nombre: nombre.length < 3 || nombre.length > 100 ? 'El nombre debe tener entre 3 y 100 caracteres.' : '',
    categoria: requerido(v.categoria, 'Selecciona una categoría.'),
    marca: requerido(v.marca, 'La marca es obligatoria.'),
    precio: /^\d+$/.test(String(v.precio)) && Number(v.precio) > 0 ? '' : 'El precio debe ser un número entero mayor a 0.',
    stock: /^\d+$/.test(String(v.stock)) ? '' : 'El stock debe ser un número entero (0 o más).',
    descripcion: desc === '' || desc.length > 300 ? 'La descripción es obligatoria (máximo 300 caracteres).' : '',
  });
}