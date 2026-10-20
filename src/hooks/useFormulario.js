import { useState } from 'react';

export function useFormulario(inicial, validar, sanitizadores = {}) {
  const [valores, setValores] = useState(inicial);
  const [errores, setErrores] = useState({});

  const cambiar = (e) => {
    const { name, value } = e.target;
    const limpio = sanitizadores[name] ? sanitizadores[name](value) : value; // bloqueo en tiempo real
    setValores((v) => ({ ...v, [name]: limpio }));
    if (errores[name]) setErrores((er) => ({ ...er, [name]: '' }));
  };

  const enviar = (alExito) => (e) => {
    e.preventDefault();
    const nuevos = validar(valores);
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) alExito(valores);
  };

  const reiniciar = () => {
    setValores(inicial);
    setErrores({});
  };

  return { valores, errores, cambiar, enviar, reiniciar };
}