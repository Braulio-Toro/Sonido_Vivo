function Hero({ eyebrow, titulo, texto, imagen, altImagen, etiqueta, children }) {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="contenedor hero__grid">
        <div className="hero__contenido">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="hero-titulo" className="hero__titulo">{titulo}</h1>
          <p className="hero__texto">{texto}</p>
          {children}
        </div>
        <div className="hero__imagen">
          <img src={imagen} alt={altImagen} />
          <span className="hero__etiqueta">{etiqueta}</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;