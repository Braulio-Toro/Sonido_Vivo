import TarjetaAuth from '../components/TarjetaAuth';
import FormularioLogin from '../components/FormularioLogin';

function Login() {
  return (
    <TarjetaAuth
      eyebrow="Bienvenido de vuelta"
      titulo="Iniciar Sesión"
      subtitulo="Demo: admin@duoc.cl / admin123 · cliente@gmail.com / 1234"
      pieTexto="¿Aún no tienes una cuenta?"
      pieTo="/registro"
      pieEnlace="Regístrate aquí"
    >
      <FormularioLogin />
    </TarjetaAuth>
  );
}

export default Login;