import TarjetaAuth from '../components/TarjetaAuth';
import FormularioRegistro from '../components/FormularioRegistro';

function Registro() {
  return (
    <TarjetaAuth
      eyebrow="Crea tu cuenta"
      titulo="Registro de Usuario"
      subtitulo="Ingresa tus datos para registrarte en Sonido Vivo"
      pieTexto="¿Ya tienes una cuenta?"
      pieTo="/login"
      pieEnlace="Inicia sesión aquí"
    >
      <FormularioRegistro />
    </TarjetaAuth>
  );
}

export default Registro;