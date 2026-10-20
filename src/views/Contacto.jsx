import TarjetaAuth from '../components/TarjetaAuth';
import FormularioContacto from '../components/FormularioContacto';

function Contacto() {
  return (
    <TarjetaAuth
      eyebrow="Hablemos"
      titulo="Contacto"
      subtitulo="¿Tienes una consulta? Escríbenos y te respondemos a la brevedad."
      pieTexto="¿Prefieres visitarnos?"
      pieTo="/"
      pieEnlace="Volver al inicio"
    >
      <FormularioContacto />
    </TarjetaAuth>
  );
}

export default Contacto;