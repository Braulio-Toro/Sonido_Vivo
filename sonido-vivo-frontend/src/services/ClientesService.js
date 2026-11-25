import api from './api';

// Clientes: solo el rol ADMIN puede consultarlos/modificarlos.
export const getAllClientes = async () => (await api.get('/clientes')).data;
export const getClienteById = async (id) => (await api.get(`/clientes/${id}`)).data;
export const updateCliente = async (id, cliente) => (await api.put(`/clientes/${id}`, cliente)).data;
export const deleteCliente = async (id) => (await api.delete(`/clientes/${id}`)).data;

const ClientesService = { getAllClientes, getClienteById, updateCliente, deleteCliente };
export default ClientesService;
