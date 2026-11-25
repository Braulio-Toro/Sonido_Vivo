import { useContext } from 'react';
import { ProductosContext } from '../context/ProductosContext';

export function useProductos() {
  const contexto = useContext(ProductosContext);
  if (!contexto) throw new Error('useProductos debe usarse dentro de <ProductosProvider>');
  return contexto;
}