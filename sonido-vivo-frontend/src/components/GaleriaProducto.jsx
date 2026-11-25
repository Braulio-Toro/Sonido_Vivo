import TarjetaProducto from './TarjetaProducto';

function GaleriaProducto({ productos }) {
  return (
    <div className="grilla-productos">
      {productos.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
    </div>
  );
}

export default GaleriaProducto;