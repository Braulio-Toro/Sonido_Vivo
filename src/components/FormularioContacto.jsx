import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Campo from './Campo';
import { useFormulario } from '../hooks/useFormulario';
import { validarContacto } from '../utils/validaciones';
import { MOTIVOS } from '../data/tienda';

const INICIAL = { nombreContacto: '', correoContacto: '', motivo: '', comentario: '' };

function FormularioContacto() {
  const [enviado, setEnviado] = useState(false);
  const { valores, errores, cambiar, enviar, reiniciar } = useFormulario(INICIAL, validarContacto);
  const campo = (id) => ({ id, valor: valores[id], onChange: cambiar, error: errores[id] });

  const alExito = () => {
    setEnviado(true);
    reiniciar();
  };

  return (
    <Form noValidate onSubmit={enviar(alExito)}>
      <Campo label="Nombre completo" placeholder="Tu nombre" {...campo('nombreContacto')} />
      <Campo label="Correo electrónico" placeholder="tu@correo.com" {...campo('correoContacto')} />
      <Campo label="Motivo de la consulta" opciones={MOTIVOS} {...campo('motivo')} />
      <Campo label="Mensaje" filas={5} placeholder="Cuéntanos en qué podemos ayudarte" {...campo('comentario')} />
      <button type="submit" className="boton boton--principal">Enviar mensaje</button>
      {enviado && <p className="mensaje-exito" role="status">¡Gracias! Tu mensaje fue enviado correctamente.</p>}
    </Form>
  );
}

export default FormularioContacto;