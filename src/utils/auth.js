export const USUARIOS_ESTATICOS = [
  { nombre: 'Administrador Sonido Vivo', rut: '111111111', correo: 'admin@duoc.cl', fono: '+56912345678', fenac: '1990-01-01', instrumento: 'Guitarra', nivel: 'Profesional', pass: 'admin123', rol: 'admin' },
  { nombre: 'Cliente Demo', rut: '222222222', correo: 'cliente@gmail.com', fono: '', fenac: '2000-05-10', instrumento: 'Bajo', nivel: 'Intermedio', pass: '1234', rol: 'cliente' },
];

export function leerUsuariosRegistrados() {
  try {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
  } catch {
    return [];
  }
}

export function autenticar(correo, pass, registrados = []) {
  const c = correo.trim().toLowerCase();
  const usuario = [...USUARIOS_ESTATICOS, ...registrados].find((u) => u.correo.toLowerCase() === c && u.pass === pass);
  if (!usuario) return null;
  const { pass: _omitida, ...publico } = usuario;
  return publico;
}