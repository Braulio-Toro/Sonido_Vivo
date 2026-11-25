import { Link } from 'react-router-dom';

function TarjetaAuth({ eyebrow, titulo, subtitulo, pieTexto, pieTo, pieEnlace, children }) {
  return (
    <section className="login-contenedor">
      <div className="tarjeta-login">
        <div className="tarjeta-login__encabezado">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="tarjeta-login__titulo">{titulo}</h1>
          <p className="tarjeta-login__subtitulo">{subtitulo}</p>
        </div>
        {children}
        <div className="tarjeta-login__registro">
          <p>{pieTexto}</p>
          <Link to={pieTo}>{pieEnlace}</Link>
        </div>
      </div>
    </section>
  );
}

export default TarjetaAuth;