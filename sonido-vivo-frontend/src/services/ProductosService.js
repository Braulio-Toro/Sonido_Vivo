import api from './api';

// Servicio REST de productos: GET/POST/PUT/DELETE contra /api/productos.
// Cada función devuelve response.data (el JSON del backend).
export const getAllProductos = async () => (await api.get('/productos')).data;
export const getProductoById = async (id) => (await api.get(`/productos/${id}`)).data;
export const createProducto = async (producto) => (await api.post('/productos', producto)).data;
export const updateProducto = async (id, producto) => (await api.put(`/productos/${id}`, producto)).data;
export const deleteProducto = async (id) => (await api.delete(`/productos/${id}`)).data;

const ProductosService = { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto };
export default ProductosService;
