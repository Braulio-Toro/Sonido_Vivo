import { useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import Seccion from '../components/Seccion';
import FormularioProducto from '../components/FormularioProducto';
import TablaProductos from '../components/TablaProductos';
import { useProductos } from '../hooks/useProductos';

function Admin() {
  const { productos, agregarProducto, actualizarProducto, eliminarProducto } = useProductos();
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // Devuelve true si el backend guardó el producto (el formulario solo se limpia en ese caso).
  const guardar = async (datos) => {
    setError('');
    try {
      if (editando) {
        await actualizarProducto(editando.id, datos);
        setMensaje(`Producto "${datos.nombre}" actualizado.`);
        setEditando(null);
      } else {
        await agregarProducto(datos);
        setMensaje(`Producto "${datos.nombre}" agregado al catálogo.`);
      }
      return true;
    } catch (e) {
      setMensaje('');
      setError(e.message);
      return false;
    }
  };

  const eliminar = async (id) => {
    setError('');
    try {
      await eliminarProducto(id);
      setMensaje('Producto eliminado del catálogo.');
    } catch (e) {
      setMensaje('');
      setError(e.message);
    }
  };

  return (
    <Seccion id="admin-titulo" eyebrow="Solo usuarios autenticados" titulo="Panel de control" h1>
      {mensaje && <p className="mensaje-exito" role="status">{mensaje}</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-4">
        <Col xs={12} lg={4}>
          <div className="tarjeta-login" style={{ maxWidth: '100%' }}>
            <h2 className="carrito-compras__resumen-titulo">{editando ? 'Editar producto' : 'Nuevo producto'}</h2>
            <FormularioProducto
              key={editando?.id || 'nuevo'}
              producto={editando}
              onGuardar={guardar}
              onCancelar={() => setEditando(null)}
            />
          </div>
        </Col>
        <Col xs={12} lg={8}>
          <TablaProductos productos={productos} onEditar={setEditando} onEliminar={eliminar} />
        </Col>
      </Row>
    </Seccion>
  );
}

export default Admin;