import { Link } from 'react-router-dom';

function MigaPan({ items }) {
  return (
    <div className="contenedor">
      <nav className="miga-pan" aria-label="Ruta de navegación">
        {items.map((it, i) => (
          <span key={it.texto}>
            {it.to ? <Link to={it.to}>{it.texto}</Link> : <span aria-current="page">{it.texto}</span>}
            {i < items.length - 1 && <span aria-hidden="true"> › </span>}
          </span>
        ))}
      </nav>
    </div>
  );
}

export default MigaPan;