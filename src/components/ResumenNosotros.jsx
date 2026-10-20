import { Link } from 'react-router-dom';
import video from '../assets/vid/video_banda.mp4';

function ResumenNosotros() {
  return (
    <section className="seccion" aria-labelledby="nosotros-titulo">
      <div className="contenedor nosotros__grid">
        <div>
          <p className="eyebrow">Nuestra historia</p>
          <h2 id="nosotros-titulo">Once años afinando a la escena musical de Valparaíso</h2>
          <p>
            Sonido Vivo nació en Viña del Mar como un mesón atendido por su dueño y hoy suma dos vendedores que conocen
            cada instrumento del catálogo. Reparamos instrumentos de cuerda y ayudamos a músicos de todo Chile a
            encontrar su sonido, ya sea de forma presencial o en línea.
          </p>
          <ul className="nosotros__lista">
            <li>Atención especializada por músicos, para músicos.</li>
            <li>Servicio de reparación de instrumentos de cuerda.</li>
            <li>Despacho a regiones vía Starken y Chilexpress.</li>
          </ul>
          <div className="hero__acciones" style={{ marginTop: 24 }}>
            <Link to="/nosotros" className="boton boton--secundario">Conoce al equipo</Link>
          </div>
        </div>
        <div className="hero__imagen">
          <div className="video-tienda__marco">
            <video autoPlay loop muted playsInline preload="metadata">
              <source src={video} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResumenNosotros;