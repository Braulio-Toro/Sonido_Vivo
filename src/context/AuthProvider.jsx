import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { autenticar, leerUsuariosRegistrados, USUARIOS_ESTATICOS } from '../utils/auth';

function leerSesion() {
  try {
    if (localStorage.getItem('usuarioLogueado') !== 'true') return null;
    return JSON.parse(localStorage.getItem('sesion'));
  } catch {
    return null;
  }
}

// Sesión de demostración: no hay servidor, se guarda en localStorage.
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion);

  const login = (correo, pass) => {
    const encontrado = autenticar(correo, pass, leerUsuariosRegistrados());
    if (!encontrado) return false;
    localStorage.setItem('usuarioLogueado', 'true');
    localStorage.setItem('sesion', JSON.stringify(encontrado));
    setUsuario(encontrado);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('sesion');
    setUsuario(null);
  };

  const registrar = (datos) => {
    const registrados = leerUsuariosRegistrados();
    const existe = [...USUARIOS_ESTATICOS, ...registrados].some(
      (u) => u.correo.toLowerCase() === datos.correo.toLowerCase()
    );
    if (existe) return false;
    localStorage.setItem('usuarios', JSON.stringify([...registrados, { ...datos, rol: 'cliente' }]));
    return true;
  };

  return (
    <AuthContext.Provider value={{ usuario, estaLogueado: !!usuario, login, logout, registrar }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;