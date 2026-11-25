import { useCallback, useEffect, useState } from 'react';
import { ProductosContext } from './ProductosContext';
import ProductosService from '../services/ProductosService';
import { extraerLista, mensajeDeError, productoDesdeApi, productoHaciaApi } from '../utils/api';
import { siguienteCodigo } from '../utils/productos';

// El catálogo viene del backend (GET /api/productos) y el panel de control hace CRUD contra la API.
function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    try {
      const data = await ProductosService.getAllProductos();
      setProductos(extraerLista(data).map(productoDesdeApi));
      setError('');
    } catch (e) {
      setError(mensajeDeError(e, 'No se pudo cargar el catálogo.'));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Las operaciones del panel devuelven una promesa: si el backend rechaza, lanzan Error con mensaje legible.
  const agregarProducto = async (datos) => {
    try {
      const creado = await ProductosService.createProducto(
        productoHaciaApi(datos, siguienteCodigo(datos.categoria, productos))
      );
      const nuevo = productoDesdeApi(creado);
      setProductos((lista) => [...lista, nuevo]);
      return nuevo;
    } catch (e) {
      throw new Error(mensajeDeError(e, 'No se pudo crear el producto.'));
    }
  };

  const actualizarProducto = async (id, datos) => {
    const actual = productos.find((p) => p.id === id);
    try {
      const guardado = await ProductosService.updateProducto(id, productoHaciaApi(datos, actual?.codigo));
      const actualizado = productoDesdeApi(guardado);
      setProductos((lista) => lista.map((p) => (p.id === id ? actualizado : p)));
      return actualizado;
    } catch (e) {
      throw new Error(mensajeDeError(e, 'No se pudo actualizar el producto.'));
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await ProductosService.deleteProducto(id);
      setProductos((lista) => lista.filter((p) => p.id !== id));
      setFavoritos((f) => f.filter((fid) => fid !== id));
    } catch (e) {
      throw new Error(mensajeDeError(e, 'No se pudo eliminar el producto.'));
    }
  };

  const toggleFavorito = (id) =>
    setFavoritos((f) => (f.includes(id) ? f.filter((fid) => fid !== id) : [...f, id]));

  return (
    <ProductosContext.Provider
      value={{
        productos, favoritos, cargando, error, cargarProductos,
        agregarProducto, actualizarProducto, eliminarProducto, toggleFavorito,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export default ProductosProvider;
