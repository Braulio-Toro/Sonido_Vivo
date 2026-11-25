export const MAX_UNIDADES = 10;
export const CUPONES = { SONIDO10: 10 }; // código -> % de descuento

export function agregarAlCarrito(carrito, producto) {
  const existe = carrito.find((i) => i.id === producto.id);
  if (existe) {
    return carrito.map((i) =>
      i.id === producto.id ? { ...i, cantidad: Math.min(MAX_UNIDADES, i.cantidad + producto.cantidad) } : i
    );
  }
  return [...carrito, producto];
}

export const eliminarDelCarrito = (carrito, id) => carrito.filter((i) => i.id !== id);

export const cambiarCantidad = (carrito, id, nueva) =>
  carrito.map((i) => (i.id === id ? { ...i, cantidad: Math.max(1, Math.min(MAX_UNIDADES, nueva)) } : i));

export const calcularUnidades = (carrito) => carrito.reduce((acc, i) => acc + i.cantidad, 0);
export const calcularSubtotal = (carrito) => carrito.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

export const porcentajeCupon = (codigo) => CUPONES[codigo.trim().toUpperCase()] || 0;
export const calcularTotal = (subtotal, porcentaje) => Math.round(subtotal - (subtotal * porcentaje) / 100);