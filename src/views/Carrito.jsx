import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Seccion from '../components/Seccion';
import ItemCarrito from '../components/ItemCarrito';
import ResumenCarrito from '../components/ResumenCarrito';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';

function Carrito() {
  const { carrito, cambiar, eliminar, subtotal, vaciar } = useCart();
  const { estaLogueado } = useAuth();
  const navigate = useNavigate();
  const [compraExitosa, setCompraExitosa] = useState(false);

  const pagar = () => {
    if (!estaLogueado) return navigate('/login', { state: { from: '/carrito' } });
    vaciar();
    setCompraExitosa(true);
  };

  return (
    <Seccion id="carrito-titulo" eyebrow="Revisa antes de pagar" titulo="Mi carrito de compras" h1 clase="carrito-compras">
      {compraExitosa && <p className="mensaje-exito" role="status">¡Compra realizada con éxito! Gracias por preferir Sonido Vivo.</p>}

      {carrito.length > 0 ? (
        <div className="carrito-compras__grid">
          <div className="carrito-compras__lista">
            {carrito.map((item) => (
              <ItemCarrito key={item.id} item={item} onCambiar={cambiar} onEliminar={eliminar} />
            ))}
          </div>
          <ResumenCarrito subtotal={subtotal} onPagar={pagar} />
        </div>
      ) : (
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="boton boton--principal">Ver productos</Link>
        </div>
      )}
    </Seccion>
  );
}

export default Carrito;