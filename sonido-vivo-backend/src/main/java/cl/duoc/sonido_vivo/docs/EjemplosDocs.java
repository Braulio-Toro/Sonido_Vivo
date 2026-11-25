
package cl.duoc.sonido_vivo.docs;

/** Solo documentación: ejemplos JSON que se muestran en Swagger. */
public final class EjemplosDocs {
    private EjemplosDocs() {}

    public static final String NO_ENCONTRADO_CLIENTE =
            "{\"timestamp\":\"2026-11-21T12:00:00\",\"status\":404,\"error\":\"Cliente no encontrado\",\"path\":\"/api/clientes/99\"}";

    public static final String NO_ENCONTRADO_PRODUCTO =
            "{\"timestamp\":\"2026-11-21T12:00:00\",\"status\":404,\"error\":\"Producto no encontrado\",\"path\":\"/api/productos/99\"}";

    public static final String NO_ENCONTRADO_VENTA =
            "{\"timestamp\":\"2026-11-21T12:00:00\",\"status\":404,\"error\":\"Venta no encontrada\",\"path\":\"/api/ventas/99\"}";

    public static final String VALIDACION_CLIENTE =
            "{\"correo\":\"El correo debe terminar en @gmail.com, @duoc.cl o @profesor.duoc.cl\",\"rut\":\"El RUT debe ser sin puntos ni guion (Ej: 19011022K)\"}";

    public static final String VALIDACION_PRODUCTO =
            "{\"precio\":\"El precio debe ser mayor a 0\",\"nombre\":\"El nombre debe tener entre 3 y 100 caracteres\"}";

    public static final String VALIDACION_VENTA =
            "{\"cantidad\":\"La cantidad máxima es 10\",\"total\":\"El total debe ser mayor a 0\"}";

    public static final String INTEGRIDAD =
            "{\"timestamp\":\"2026-11-21T12:00:00\",\"status\":409,\"error\":\"No se pudo guardar el registro. Revisa los campos obligatorios, las relaciones y que los datos únicos no estén repetidos.\",\"path\":\"/api/productos\"}";

    public static final String CREDENCIALES =
            "{\"timestamp\":\"2026-11-21T12:00:00\",\"status\":401,\"error\":\"Correo o contraseña incorrectos\",\"path\":\"/api/auth/login\"}";

    public static final String CORREO_REPETIDO =
            "{\"timestamp\":\"2026-11-21T12:00:00\",\"status\":409,\"error\":\"El correo ya está registrado\",\"path\":\"/api/auth/register\"}";
}