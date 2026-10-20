import { Link } from 'react-router-dom';

function CtaFinal({ titulo }) {
  return (
    <section className="seccion" style={{ borderTop: 'none', paddingTop: 0, paddingBottom: 0 }}>
      <div className="cta-final">
        <h2>{titulo}</h2>
        <Link to="/contacto" className="boton boton--secundario">Escríbenos</Link>
      </div>
    </section>
  );
}

export default CtaFinal;