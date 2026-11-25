import { useState } from 'react';
import { ProductosContext } from './ProductosContext';
import { PRODUCTOS_INICIALES } from '../data/productos';
import { crearProducto } from '../utils/productos';

function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [favoritos, setFavoritos] = useState([]);

  const agregarProducto = (datos) => setProductos((lista) => [...lista, crearProducto(datos, lista)]);

  const actualizarProducto = (id, datos) =>
    setProductos((lista) =>
      lista.map((p) => (p.id === id ? { ...p, ...datos, precio: Number(datos.precio), stock: Number(datos.stock) } : p))
    );

  const eliminarProducto = (id) => {
    setProductos((lista) => lista.filter((p) => p.id !== id));
    setFavoritos((f) => f.filter((fid) => fid !== id));
  };

  const toggleFavorito = (id) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((fid) => fid !== id) : [...f, id]));

  return (
    <ProductosContext.Provider
      value={{ productos, favoritos, agregarProducto, actualizarProducto, eliminarProducto, toggleFavorito }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export default ProductosProvider;