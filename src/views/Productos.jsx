import { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Seccion from '../components/Seccion';
import GaleriaProducto from '../components/GaleriaProducto';
import { useProductos } from '../hooks/useProductos';
import { filtrarProductos } from '../utils/productos';
import { CATEGORIAS } from '../data/productos';

function Productos() {
  const { productos } = useProductos();
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const visibles = filtrarProductos(productos, { categoria, busqueda });

  return (
    <Seccion
      id="productos-titulo"
      eyebrow="Catálogo completo"
      titulo="Productos"
      h1
      extra={<p className="productos__conteo">{visibles.length} producto(s)</p>}
    >
      <Row className="filtros-catalogo g-3">
        <Col xs={12} md={8}>
          <Form.Control type="search" placeholder="Buscar por nombre..." aria-label="Buscar producto" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </Col>
        <Col xs={12} md={4}>
          <Form.Select aria-label="Filtrar por categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas las categorías</option>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </Form.Select>
        </Col>
      </Row>

      {visibles.length ? <GaleriaProducto productos={visibles} /> : <p>No encontramos productos con ese criterio.</p>}
    </Seccion>
  );
}

export default Productos;