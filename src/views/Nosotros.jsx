import Hero from '../components/Hero';
import Seccion from '../components/Seccion';
import MiembroEquipo from '../components/MiembroEquipo';
import CtaFinal from '../components/CtaFinal';
import { equipo } from '../data/tienda';
import banda from '../assets/img/banda.jpg';
import fondo2 from '../assets/img/Fondo2.jpg';

function Nosotros() {
  return (
    <>
      <Hero
        eyebrow="Nuestra historia"
        titulo={<>Músicos vendiéndole a <em>músicos</em></>}
        texto="Sonido Vivo nació en Viña del Mar hace 11 años como un mesón atendido por su propio dueño. Hoy somos un equipo de tres personas que conoce cada instrumento del catálogo porque los toca, los repara y los recomienda con criterio."
        imagen={banda}
        altImagen="Equipo de Sonido Vivo en el mesón de atención de la tienda"
        etiqueta="Viña del Mar, desde 2015"
      />

      <section className="seccion" aria-labelledby="historia-titulo">
        <div className="contenedor nosotros__grid">
          <div>
            <p className="eyebrow">Cómo empezamos</p>
            <h2 id="historia-titulo">Once años afinando a la escena musical de Valparaíso</h2>
            <p>
              Todo comenzó con una guitarra reparada en el living de una casa y la convicción de que la Región de
              Valparaíso necesitaba una tienda que entendiera de verdad lo que significa tocar en vivo. Desde entonces
              hemos ayudado a cientos de músicos, bandas escolares y estudios de grabación a encontrar el instrumento
              correcto para cada escenario.
            </p>
            <ul className="nosotros__lista">
              <li>Atención especializada por músicos, para músicos.</li>
              <li>Servicio de reparación de instrumentos de cuerda.</li>
              <li>Despacho a regiones vía Starken y Chilexpress.</li>
              <li>Asesoría personalizada antes de cada compra.</li>
            </ul>
          </div>
          <div className="hero__imagen">
            <img src={fondo2} alt="Guitarra siendo reparada en el taller de Sonido Vivo" />
          </div>
        </div>
      </section>

      <Seccion id="equipo-titulo" eyebrow="Quiénes somos" titulo="Nuestro equipo" clase="categorias">
        <div className="grilla-equipo">
          {equipo.map((m) => <MiembroEquipo key={m.nombre} miembro={m} />)}
        </div>
      </Seccion>

      <CtaFinal titulo="¿Tienes dudas sobre algún instrumento?" />
    </>
  );
}

export default Nosotros;