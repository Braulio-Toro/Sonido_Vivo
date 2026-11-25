import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import AuthService from '../services/AuthService';
import { CLAVE_TOKEN, EVENTO_SESION_EXPIRADA } from '../services/api';
import { mensajeDeError, registroHaciaApi, tokenVigente, usuarioDesdeApi } from '../utils/api';

function limpiarSesion() {
  localStorage.removeItem('usuarioLogueado');
  localStorage.removeItem('sesion');
  localStorage.removeItem(CLAVE_TOKEN);
}

function leerSesion() {
  try {
    if (localStorage.getItem('usuarioLogueado') !== 'true') return null;
    const token = localStorage.getItem(CLAVE_TOKEN);
    const usuario = JSON.parse(localStorage.getItem('sesion'));
    if (!token || !usuario || !tokenVigente(token)) {
      limpiarSesion();
      return null;
    }
    return usuario;
  } catch {
    return null;
  }
}

// Sesión real: el backend (Spring Boot + JWT) valida las credenciales.
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion);

  const logout = useCallback(() => {
    limpiarSesion();
    setUsuario(null);
  }, []);

  // El interceptor de axios avisa cuando el backend responde 401 (token vencido).
  useEffect(() => {
    window.addEventListener(EVENTO_SESION_EXPIRADA, logout);
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, logout);
  }, [logout]);

  // Devuelve { ok: true } o { ok: false, mensaje }
  const login = async (correo, password) => {
    try {
      const { token, usuario: datos } = await AuthService.login(correo.trim(), password);
      const publico = usuarioDesdeApi(datos);
      localStorage.setItem(CLAVE_TOKEN, token);
      localStorage.setItem('usuarioLogueado', 'true');
      localStorage.setItem('sesion', JSON.stringify(publico));
      setUsuario(publico);
      return { ok: true };
    } catch (error) {
      return { ok: false, mensaje: mensajeDeError(error, 'Correo o contraseña incorrectos.') };
    }
  };

  // Devuelve { ok: true } o { ok: false, mensaje }
  const registrar = async (datos) => {
    try {
      await AuthService.register(registroHaciaApi(datos));
      return { ok: true };
    } catch (error) {
      return { ok: false, mensaje: mensajeDeError(error, 'No se pudo completar el registro.') };
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, estaLogueado: !!usuario, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
