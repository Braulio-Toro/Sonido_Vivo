import { useParams } from 'react-router-dom';
import DetalleProducto from '../components/DetalleProducto';
import NotFound from './NotFound';
import { useProductos } from '../hooks/useProductos';

function Producto() {
  const { id } = useParams();
  const { productos, cargando } = useProductos();
  const producto = productos.find((p) => p.id === id);
  if (cargando && !producto) return <p className="productos__conteo">Cargando producto...</p>;
  if (!producto) return <NotFound />;
  return <DetalleProducto key={producto.id} producto={producto} />;
}

export default Producto;