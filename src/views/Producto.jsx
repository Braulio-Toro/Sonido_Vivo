import { useParams } from 'react-router-dom';
import DetalleProducto from '../components/DetalleProducto';
import NotFound from './NotFound';
import { useProductos } from '../hooks/useProductos';

function Producto() {
  const { id } = useParams();
  const { productos } = useProductos();
  const producto = productos.find((p) => p.id === id);
  if (!producto) return <NotFound />;
  return <DetalleProducto key={producto.id} producto={producto} />;
}

export default Producto;