import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Seccion from '../components/Seccion';
import GaleriaProducto from '../components/GaleriaProducto';
import Categorias from '../components/Categorias';
import ResumenNosotros from '../components/ResumenNosotros';
import Testimonio from '../components/Testimonio';
import CtaFinal from '../components/CtaFinal';
import { useProductos } from '../hooks/useProductos';
import banda from '../assets/img/banda.jpg';

function Home() {
  const { productos } = useProductos();
  return (
    <>
      <Hero
        eyebrow="Viña del Mar · Desde hace 11 años"
        titulo={<>El sonido correcto para <em>cada escenario</em></>}
        texto="En Sonido Vivo encuentras guitarras, bajos, baterías, teclados, amplificadores, micrófonos y pedales de efectos, además de servicio de reparación de instrumentos de cuerda. Más de 340 referencias disponibles, atendidas por músicos que saben de qué hablan."
        imagen={banda}
        altImagen="Guitarra eléctrica apoyada junto a un amplificador de válvulas en la tienda Sonido Vivo"
        etiqueta="Vitrina de la semana"
      >
        <div className="hero__acciones">
          <Link to="/productos" className="boton boton--principal">Ver productos</Link>
          <Link to="/nosotros" className="boton boton--secundario">Conoce la tienda</Link>
        </div>
        <div className="hero__cifras">
          <div className="cifra"><strong>340+</strong><span>Referencias en catálogo</span></div>
          <div className="cifra"><strong>11</strong><span>Años de trayectoria</span></div>
          <div className="cifra"><strong>100%</strong><span>Reparación de cuerdas</span></div>
        </div>
      </Hero>

      <div className="contenedor">
        <div className="ecualizador" role="presentation" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => <span key={i}></span>)}
        </div>
      </div>

      <Seccion
        id="productos-titulo"
        eyebrow="Recién llegados"
        titulo="Productos destacados"
        extra={<Link to="/productos" className="seccion__enlace">Ver catálogo completo →</Link>}
      >
        <GaleriaProducto productos={productos.slice(0, 8)} />
      </Seccion>

      <Categorias />
      <ResumenNosotros />
      <Testimonio />
      <CtaFinal titulo="¿Buscas un instrumento que no ves en el catálogo?" />
    </>
  );
}

export default Home;