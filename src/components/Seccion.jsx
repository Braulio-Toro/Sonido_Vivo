function Seccion({ id, eyebrow, titulo, h1 = false, extra, clase = '', children }) {
  const Titulo = h1 ? 'h1' : 'h2';
  return (
    <section className={`seccion ${clase}`.trim()} aria-labelledby={id}>
      <div className="contenedor">
        <div className="seccion__cabecera">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <Titulo id={id}>{titulo}</Titulo>
          </div>
          {extra}
        </div>
        {children}
      </div>
    </section>
  );
}

export default Seccion;