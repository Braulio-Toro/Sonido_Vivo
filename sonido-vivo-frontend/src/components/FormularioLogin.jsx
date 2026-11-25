import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Campo from './Campo';
import { useFormulario } from '../hooks/useFormulario';
import { useAuth } from '../hooks/useAuth';
import { validarLogin } from '../utils/validaciones';

function FormularioLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorGeneral, setErrorGeneral] = useState('');
  const { valores, errores, cambiar, enviar } = useFormulario({ correo: '', password: '' }, validarLogin);

  const alExito = async ({ correo, password }) => {
    setErrorGeneral('');
    const resultado = await login(correo, password);
    if (resultado.ok) {
      navigate(location.state?.from || '/', { replace: true });
    } else {
      setErrorGeneral(resultado.mensaje || 'Correo o contraseña incorrectos.');
    }
  };

  return (
    <Form noValidate onSubmit={enviar(alExito)}>
      {location.state?.registrado && <Alert variant="success">¡Registro completado con éxito! Ya puedes iniciar sesión.</Alert>}
      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}
      <Campo id="correo" label="Correo electrónico" tipo="email" placeholder="tu@correo.com" valor={valores.correo} onChange={cambiar} error={errores.correo} />
      <Campo id="password" label="Contraseña" tipo="password" placeholder="••••••••" valor={valores.password} onChange={cambiar} error={errores.password} />
      <button type="submit" className="boton boton--principal">Ingresar</button>
    </Form>
  );
}

export default FormularioLogin;