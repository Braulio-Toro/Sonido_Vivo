import axios from 'axios';

// URL base de la API (Spring Boot). Se configura en el archivo .env -> VITE_API_URL
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '');

export const CLAVE_TOKEN = 'token';
export const EVENTO_SESION_EXPIRADA = 'sv:sesion-expirada';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Adjunta el JWT (si existe) en cada petición: Authorization: Bearer <token>
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(CLAVE_TOKEN);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    /* localStorage no disponible: se envía sin token */
  }
  return config;
});

// Si el backend responde 401 en una ruta protegida, la sesión venció: se avisa a AuthProvider.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const url = error.config?.url || '';
    if (error.response?.status === 401 && !url.startsWith('/auth/') && typeof window !== 'undefined') {
      window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA));
    }
    return Promise.reject(error);
  }
);

export default api;
