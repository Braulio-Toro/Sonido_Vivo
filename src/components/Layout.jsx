import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { itemsMenu } from '../data/tienda';

// Estructura común a todas las rutas: franja + encabezado + contenido + pie.
function Layout() {
  const { pathname } = useLocation();
  const pieReducido = pathname === '/login' || pathname === '/registro'; // igual que tu HTML original

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <p className="franja-aviso">
        Envíos a todo Chile · Retiro en tienda, Viña del Mar · 11 años afinando a nuestros clientes
      </p>
      <Header itemsMenu={itemsMenu} />
      <main>
        <Outlet />
      </main>
      <Footer reducido={pieReducido} />
    </>
  );
}

export default Layout;