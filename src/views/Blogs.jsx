import Seccion from '../components/Seccion';
import TarjetaBlog from '../components/TarjetaBlog';
import { BLOGS } from '../data/blogs';

function Blogs() {
  return (
    <Seccion id="blogs-titulo" eyebrow="Casos curiosos" titulo="Noticias importantes" h1>
      <div className="grilla-blogs">
        {BLOGS.map((b) => <TarjetaBlog key={b.slug} blog={b} />)}
      </div>
    </Seccion>
  );
}

export default Blogs;