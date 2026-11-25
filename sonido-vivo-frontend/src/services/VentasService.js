import api from './api';

// Ventas: requiere token (usuario logueado).
export const getAllVentas = async () => (await api.get('/ventas')).data;
export const createVenta = async (venta) => (await api.post('/ventas', venta)).data;

const VentasService = { getAllVentas, createVenta };
export default VentasService;
