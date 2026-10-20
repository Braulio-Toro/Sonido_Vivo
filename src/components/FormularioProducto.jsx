import { Form } from 'react-bootstrap';
import Campo from './Campo';
import { useFormulario } from '../hooks/useFormulario';
import { validarProducto } from '../utils/validaciones';
import { CATEGORIAS } from '../data/productos';

const VACIO = { nombre: '', categoria: '', marca: '', precio: '', stock: '', descripcion: '' };

function FormularioProducto({ producto, onGuardar, onCancelar }) {
  const inicial = producto
    ? { nombre: producto.nombre, categoria: producto.categoria, marca: producto.marca, precio: String(producto.precio), stock: String(producto.stock), descripcion: producto.descripcion }
    : VACIO;
  const { valores, errores, cambiar, enviar, reiniciar } = useFormulario(inicial, validarProducto);
  const campo = (id) => ({ id, valor: valores[id], onChange: cambiar, error: errores[id] });

  const alExito = (datos) => {
    onGuardar(datos);
    if (!producto) reiniciar();
  };

  return (
    <Form noValidate onSubmit={enviar(alExito)}>
      <Campo label="Nombre del producto" {...campo('nombre')} />
      <Campo label="Categoría" opciones={CATEGORIAS} {...campo('categoria')} />
      <Campo label="Marca" {...campo('marca')} />
      <Campo label="Precio (CLP)" tipo="number" {...campo('precio')} />
      <Campo label="Stock disponible" tipo="number" {...campo('stock')} />
      <Campo label="Descripción" filas={3} {...campo('descripcion')} />
      <p className="tarjeta-login__subtitulo">Se asignará una imagen genérica por defecto.</p>
      <button type="submit" className="boton boton--principal">{producto ? 'Guardar cambios' : 'Agregar producto'}</button>{' '}
      {producto && <button type="button" className="boton boton--secundario" onClick={onCancelar}>Cancelar</button>}
    </Form>
  );
}

export default FormularioProducto;