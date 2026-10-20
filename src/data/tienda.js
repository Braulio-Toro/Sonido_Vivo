import brad from '../assets/img/Brad_Pitt.png';
import rachel from '../assets/img/Rachel.jpg';
import gabe from '../assets/img/Gabe.jpg';

export const itemsMenu = [
  { to: '/', label: 'Home', end: true },
  { to: '/productos', label: 'Productos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/contacto', label: 'Contacto' },
];

export const categoriasInfo = [
  { numero: '01', titulo: 'Cuerdas', texto: 'Guitarras, bajos y accesorios para instrumentistas de cuerda.' },
  { numero: '02', titulo: 'Percusión', texto: 'Baterías acústicas, electrónicas y accesorios de batería.' },
  { numero: '03', titulo: 'Amplificación', texto: 'Amplificadores de válvulas y transistores para todo estilo.' },
  { numero: '04', titulo: 'Audio en vivo', texto: 'Micrófonos, pedales de efectos y equipos de sonido.' },
];

export const equipo = [
  { nombre: 'Braulio Del Toro', cargo: 'Fundador & luthier', imagen: brad, alt: 'Fundador y guitarrista de Sonido Vivo' },
  { nombre: 'Raysa Aguilera', cargo: 'Especialista en percusión', imagen: rachel, alt: 'Vendedora especialista en percusión', posicion: '50% 24%' },
  { nombre: 'Gabe', cargo: 'Especialista en amplificación', imagen: gabe, alt: 'Vendedor especialista en amplificación', posicion: '50% 20%' },
];

// Opciones de los <select> (campos de contexto de la tienda)
export const INSTRUMENTOS = ['Guitarra', 'Bajo', 'Batería', 'Teclado', 'Voz', 'Otro'];
export const NIVELES = ['Principiante', 'Intermedio', 'Avanzado', 'Profesional'];
export const MOTIVOS = ['Consulta por un instrumento', 'Reparación de instrumento', 'Cotización para colegio o banda', 'Otro'];