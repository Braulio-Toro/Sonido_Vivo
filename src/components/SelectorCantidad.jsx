const CLASES = {
  carrito: { caja: 'selector-cantidad', boton: 'selector-cantidad__boton', input: 'cantidad-item' },
  producto: { caja: 'selector-producto', boton: '', input: '' },
};

function SelectorCantidad({ valor, onCambio, min = 1, max = 10, variante = 'carrito', idInput }) {
  const c = CLASES[variante];
  return (
    <div className={c.caja}>
      <button type="button" className={c.boton} aria-label="Restar una unidad" onClick={() => onCambio(Math.max(min, valor - 1))}>−</button>
      <input id={idInput} type="number" className={c.input} value={valor} min={min} max={max} readOnly aria-label="Cantidad" />
      <button type="button" className={c.boton} aria-label="Sumar una unidad" onClick={() => onCambio(Math.min(max, valor + 1))}>+</button>
    </div>
  );
}

export default SelectorCantidad;