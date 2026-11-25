import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Seccion from '../components/Seccion';
import FormularioProducto from '../components/FormularioProducto';
import TablaProductos from '../components/TablaProductos';
import { useProductos } from '../hooks/useProductos';

function Admin() {
  const { productos, agregarProducto, actualizarProducto, eliminarProducto } = useProductos();
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const guardar = (datos) => {
    if (editando) {
      actualizarProducto(editando.id, datos);
      setMensaje(`Producto "${datos.nombre}" actualizado.`);
      setEditando(null);
    } else {
      agregarProducto(datos);
      setMensaje(`Producto "${datos.nombre}" agregado al catálogo.`);
    }
  };

  return (
    <>
    <head>
    <link rel="icon" type="image/png" href="/favicon.png" />
    </head>
    <Seccion id="admin-titulo" eyebrow="Solo usuarios autenticados" titulo="Panel de control" h1>
      {mensaje && <p className="mensaje-exito" role="status">{mensaje}</p>}
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
          <TablaProductos productos={productos} onEditar={setEditando} onEliminar={eliminarProducto} />
        </Col>
      </Row>
    </Seccion>
    </>
  );
}

export default Admin;