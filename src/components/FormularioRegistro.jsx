import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Campo from './Campo';
import { useFormulario } from '../hooks/useFormulario';
import { useAuth } from '../hooks/useAuth';
import { validarRegistro, soloLetras, soloRut, limpiarFono } from '../utils/validaciones';
import { INSTRUMENTOS, NIVELES } from '../data/tienda';

const INICIAL = { nombre: '', rut: '', correo: '', fono: '', fenac: '', instrumento: '', nivel: '', pass: '', pass2: '' };
// Bloqueo de teclas en tiempo real (equivale a los listeners "input" del validaform.js)
const SANITIZAR = { nombre: soloLetras, rut: soloRut, fono: limpiarFono };

function FormularioRegistro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [errorGeneral, setErrorGeneral] = useState('');
  const { valores, errores, cambiar, enviar } = useFormulario(INICIAL, validarRegistro, SANITIZAR);
  const campo = (id) => ({ id, valor: valores[id], onChange: cambiar, error: errores[id] });

  const alExito = (datos) => {
    const { pass2: _confirmacion, ...usuario } = datos;
    if (!registrar(usuario)) {
      setErrorGeneral('Ya existe una cuenta con ese correo.');
      return;
    }
    navigate('/login', { state: { registrado: true } });
  };

  return (
    <Form noValidate onSubmit={enviar(alExito)}>
      {errorGeneral && <Alert variant="danger">{errorGeneral}</Alert>}
      <Campo label="Nombre completo:" placeholder="Ej: Juan Pérez" {...campo('nombre')} />
      <Campo label="RUT:" placeholder="Ej: 190110229 (sin puntos ni guion)" {...campo('rut')} />
      <Campo label="Correo electrónico:" placeholder="ejemplo@gmail.com" {...campo('correo')} />
      <Campo label="Teléfono (opcional):" placeholder="+56912345678" {...campo('fono')} />
      <Campo label="Fecha de nacimiento:" tipo="date" {...campo('fenac')} />
      <Campo label="Instrumento principal:" opciones={INSTRUMENTOS} {...campo('instrumento')} />
      <Campo label="Nivel de experiencia:" opciones={NIVELES} {...campo('nivel')} />
      <Campo label="Contraseña:" tipo="password" placeholder="••••••••" {...campo('pass')} />
      <Campo label="Confirmar contraseña:" tipo="password" placeholder="••••••••" {...campo('pass2')} />
      <button type="submit" className="boton boton--principal boton-registro">ENVIAR</button>
    </Form>
  );
}

export default FormularioRegistro;