import { Form } from 'react-bootstrap';

function Campo({ id, label, tipo = 'text', valor, onChange, error, placeholder, opciones, filas }) {
  const comun = { name: id, value: valor, onChange, isInvalid: !!error };
  return (
    <Form.Group className="formulario-grupo" controlId={id}>
      <Form.Label>{label}</Form.Label>
      {opciones ? (
        <Form.Select {...comun}>
          <option value="">Selecciona...</option>
          {opciones.map((o) => <option key={o} value={o}>{o}</option>)}
        </Form.Select>
      ) : filas ? (
        <Form.Control as="textarea" rows={filas} placeholder={placeholder} className="formulario-textarea" {...comun} />
      ) : (
        <Form.Control type={tipo} placeholder={placeholder} {...comun} />
      )}
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default Campo;