import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import {
  agregarAlCarrito, eliminarDelCarrito, cambiarCantidad, calcularUnidades, calcularSubtotal,
} from '../utils/carrito';

const CLAVE_CARRITO = 'carritoSonidoVivo';

function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);

  const value = {
    carrito,
    agregar: (producto) => setCarrito((c) => agregarAlCarrito(c, producto)),
    eliminar: (id) => setCarrito((c) => eliminarDelCarrito(c, id)),
    cambiar: (id, cantidad) => setCarrito((c) => cambiarCantidad(c, id, cantidad)),
    vaciar: () => setCarrito([]),
    unidades: calcularUnidades(carrito),
    subtotal: calcularSubtotal(carrito),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;