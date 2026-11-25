import guitarra from '../assets/img/Guitarra.png';
import bajo from '../assets/img/Bajo.png';
import bateria from '../assets/img/Bateria.png';
import ampli from '../assets/img/Ampli.png';
import teclado from '../assets/img/Teclado.png';
import micro from '../assets/img/Micro.png';
import pedal from '../assets/img/Pedal.png';
import cuerdas from '../assets/img/Cuerdas.png';
import micro2 from '../assets/img/Micro2.png';
import bajo2 from '../assets/img/Bajo2.png';
import bateria2 from '../assets/img/Bateria2.png';
import pedal2 from '../assets/img/Pedal2.png';
import logo from '../assets/img/logo2.png';

// Imagen genérica para los productos creados desde el Panel (no se suben archivos).
export const IMAGEN_POR_DEFECTO = logo;

export const CATEGORIAS = ['Guitarras', 'Bajos', 'Baterías', 'Amplificadores', 'Teclados', 'Micrófonos', 'Pedales de efectos', 'Accesorios'];

export const PRODUCTOS_INICIALES = [
  { id: 'fender-stratocaster-sunburst', codigo: 'SV-GTR-001', nombre: 'Fender Stratocaster Sunburst', categoria: 'Guitarras', marca: 'Fender', precio: 899990, stock: 5, imagen: guitarra, descripcion: 'Guitarra eléctrica de sonido versátil, clásico y definido. Ideal para presentaciones en vivo y sesiones de estudio.' },
  { id: 'fender-precision-bass-deluxe-duff-mckagan', codigo: 'SV-BAJ-001', nombre: 'Fender Precision Bass® Deluxe Duff McKagan', categoria: 'Bajos', marca: 'Fender', precio: 1999990, stock: 2, imagen: bajo, descripcion: 'Bajo eléctrico de 4 cuerdas con carácter potente y acabado negro.' },
  { id: 'bateria-acustica-5-piezas', codigo: 'SV-BAT-001', nombre: 'Batería acústica 5 piezas', categoria: 'Baterías', marca: 'Genérica', precio: 489990, stock: 4, imagen: bateria, descripcion: 'Batería acústica completa de 5 piezas, ideal para sala de ensayo.' },
  { id: 'amplificador-vox', codigo: 'SV-AMP-001', nombre: 'Amplificador Vox', categoria: 'Amplificadores', marca: 'Vox', precio: 189990, stock: 6, imagen: ampli, descripcion: 'Amplificador de válvulas para guitarra con timbre cálido.' },
  { id: 'teclado-digital-61-teclas', codigo: 'SV-TEC-001', nombre: 'Teclado digital 61 teclas', categoria: 'Teclados', marca: 'Genérica', precio: 159990, stock: 8, imagen: teclado, descripcion: 'Teclado digital de 61 teclas con sonidos variados para principiantes.' },
  { id: 'microfono-dinamico-vocal', codigo: 'SV-MIC-001', nombre: 'Micrófono dinámico vocal', categoria: 'Micrófonos', marca: 'Genérica', precio: 49990, stock: 15, imagen: micro, descripcion: 'Micrófono dinámico ideal para presentaciones en vivo.' },
  { id: 'pedal-de-distorsion-zoom-g6', codigo: 'SV-PED-001', nombre: 'Pedal de distorsión ZOOM G6', categoria: 'Pedales de efectos', marca: 'Zoom', precio: 34990, stock: 10, imagen: pedal, descripcion: 'Efecto clásico de distorsión para guitarra eléctrica.' },
  { id: 'cuerdas-ddario-guitarra', codigo: 'SV-ACC-001', nombre: "Cuerdas D'dario Guitarra", categoria: 'Accesorios', marca: "D'Addario", precio: 12990, stock: 30, imagen: cuerdas, descripcion: 'Set de cuerdas para guitarra, brillo y durabilidad.' },
  { id: 'microfono-condensador-de-estudio', codigo: 'SV-MIC-002', nombre: 'Micrófono condensador de estudio', categoria: 'Micrófonos', marca: 'Genérica', precio: 79990, stock: 9, imagen: micro2, descripcion: 'Micrófono condensador para grabación en estudio.' },
  { id: 'kaysen-bk5-bajo-electrico-5-cuerdas', codigo: 'SV-BAJ-002', nombre: 'KAYSEN BK5 Bajo Eléctrico 5 cuerdas Activo - Natural', categoria: 'Bajos', marca: 'Kaysen', precio: 279990, stock: 3, imagen: bajo2, descripcion: 'Bajo eléctrico activo de 5 cuerdas, acabado natural.' },
  { id: 'bateria-electronica-compacta', codigo: 'SV-BAT-002', nombre: 'Batería electrónica compacta', categoria: 'Baterías', marca: 'Genérica', precio: 399990, stock: 4, imagen: bateria2, descripcion: 'Batería electrónica compacta para practicar sin ruido.' },
  { id: 'pedal-de-delay-whammy', codigo: 'SV-PED-002', nombre: 'Pedal de delay Whammy', categoria: 'Pedales de efectos', marca: 'Digitech', precio: 39990, stock: 7, imagen: pedal2, descripcion: 'Pedal de efectos con pitch y delay para guitarra.' },
];

export const formatearPrecio = (numero) => '$' + numero.toLocaleString('es-CL');