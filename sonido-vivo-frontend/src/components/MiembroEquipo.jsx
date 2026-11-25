function MiembroEquipo({ miembro }) {
  return (
    <article className="miembro-equipo">
      <img src={miembro.imagen} alt={miembro.alt} style={miembro.posicion ? { objectPosition: miembro.posicion } : undefined} />
      <div className="miembro-equipo__cuerpo">
        <h3 className="miembro-equipo__nombre">{miembro.nombre}</h3>
        <p className="miembro-equipo__cargo">{miembro.cargo}</p>
      </div>
    </article>
  );
}

export default MiembroEquipo;