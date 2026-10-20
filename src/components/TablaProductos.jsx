import { Table } from 'react-bootstrap';
import { formatearPrecio } from '../data/productos';

function TablaProductos({ productos, onEditar, onEliminar }) {
  return (
    <Table responsive hover className="tabla-admin align-middle">
      <thead>
        <tr><th>Img</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td><img src={p.imagen} alt={p.nombre} /></td>
            <td>{p.nombre}</td>
            <td>{p.categoria}</td>
            <td>{formatearPrecio(p.precio)}</td>
            <td>{p.stock}</td>
            <td>
              <button type="button" className="tarjeta-blog__boton" onClick={() => onEditar(p)}>Editar</button>{' · '}
              <button type="button" className="item-carrito__eliminar" onClick={() => onEliminar(p.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TablaProductos;