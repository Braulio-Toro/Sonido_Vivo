import api from './api';

// Autenticación: /api/auth/login (devuelve { token, usuario }) y /api/auth/register.
export const login = async (correo, password) => (await api.post('/auth/login', { correo, password })).data;
export const register = async (cliente) => (await api.post('/auth/register', cliente)).data;

const AuthService = { login, register };
export default AuthService;
