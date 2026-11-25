import Seccion from './Seccion';
import { categoriasInfo } from '../data/tienda';

function Categorias() {
  return (
    <Seccion id="categorias-titulo" eyebrow="Explora por familia" titulo="Categorías" clase="categorias">
      <div className="grilla-categorias">
        {categoriasInfo.map((c) => (
          <div className="categoria" key={c.numero}>
            <span className="categoria__numero">{c.numero}</span>
            <h3>{c.titulo}</h3>
            <p>{c.texto}</p>
          </div>
        ))}
      </div>
    </Seccion>
  );
}

export default Categorias;