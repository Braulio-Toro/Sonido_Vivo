# Plan de Pruebas — Sonido Vivo

**Proyecto:** Sonido Vivo  
**Tipo de aplicación:** Sitio web de tienda de instrumentos musicales desarrollado con React y Vite.  
**Objetivo:** Verificar que las funciones principales del sitio operen correctamente, que los formularios validen los datos y que la navegación y las funciones protegidas respondan según lo esperado.

## 1. Alcance

Se consideran pruebas unitarias con Vitest y pruebas funcionales manuales de los principales flujos de usuario. Se evaluarán validaciones, autenticación, catálogo y administración de productos, carrito de compras, selector de cantidad, navegación y diseño adaptable.

La aplicación utiliza datos de productos en memoria y almacenamiento local para conservar la sesión. No se considera una compra real ni una conexión con un sistema de pagos o una base de datos externa.

## 2. Entorno de pruebas

- Navegador actualizado: Google Chrome o Microsoft Edge.
- Node.js y npm instalados.
- Dependencias instaladas mediante `npm install`.
- Ejecución de pruebas unitarias: `npm test -- --run`.
- Verificación de compilación: `npm run build`.
- Pruebas visuales manuales en escritorio y en un ancho similar al de un teléfono móvil.

## 3. Criterios de entrada y salida

### Criterios de entrada
- El proyecto puede instalar sus dependencias.
- La aplicación inicia con `npm run dev`.
- Los archivos de prueba están disponibles en `src/tests/`.

### Criterios de salida
- Las pruebas unitarias ejecutadas finalizan sin errores.
- Las rutas principales pueden abrirse y navegarse.
- Los formularios muestran errores ante datos inválidos y aceptan datos válidos.
- El carrito permite agregar productos, modificar cantidades y retirar artículos.
- Las operaciones del catálogo pueden crear, editar y eliminar productos en la sesión actual.
- Las rutas privadas impiden el acceso cuando no existe una sesión válida.
- La interfaz no presenta desbordamientos importantes en escritorio ni en móvil.

## 4. Escenarios de pruebas

| ID | Funcionalidad / componente | Procedimiento | Resultado esperado | Tipo |
|---|---|---|---|---|
| PV-01 | Validación de nombre | Ingresar un nombre válido y luego uno vacío o demasiado corto. | El nombre válido pasa la validación y el inválido genera un error. | Unitaria |
| PV-02 | Validación de correo | Probar un correo con formato válido y otro sin formato correcto. | Se acepta el correo válido y se rechaza el incorrecto. | Unitaria |
| PV-03 | Validación de contraseña | Probar contraseñas que cumplan y que no cumplan las reglas definidas en el proyecto. | El resultado coincide con las reglas implementadas. | Unitaria |
| PV-04 | Validación de formulario | Enviar el formulario con campos obligatorios vacíos. | Se muestran mensajes de validación y no se procesa el envío como válido. | Manual |
| PV-05 | Registro | Completar los campos requeridos con datos válidos y enviar. | El formulario acepta los datos y muestra la respuesta prevista por la aplicación. | Manual |
| PV-06 | Inicio de sesión | Probar las credenciales estáticas válidas y luego credenciales incorrectas. | Las credenciales válidas inician sesión; las incorrectas no autentican al usuario. | Unitaria / manual |
| PV-07 | Persistencia de sesión | Iniciar sesión y recargar la página. | La sesión se recupera desde `localStorage` según la implementación actual. | Manual |
| PV-08 | Ruta privada | Abrir `/admin` y `/perfil` sin iniciar sesión. | Se impide el acceso y se redirige al flujo de autenticación definido. | Manual |
| PV-09 | Catálogo de productos | Abrir la vista de productos y revisar las tarjetas. | Se muestran los productos disponibles con sus datos principales. | Manual |
| PV-10 | Búsqueda o filtrado | Buscar un producto por nombre o aplicar un filtro disponible. | El catálogo muestra los resultados que coinciden con la búsqueda o filtro. | Manual |
| PV-11 | Detalle de producto | Abrir un producto desde el catálogo. | Se muestra la información del producto seleccionado. | Manual |
| PV-12 | Crear producto | En administración, completar el formulario con datos válidos y guardar. | El nuevo producto aparece en el catálogo durante la sesión actual. | Manual |
| PV-13 | Imagen por defecto | Crear un producto sin proporcionar una imagen, cuando el formulario lo permita. | Se utiliza la imagen genérica configurada por el proyecto. | Manual |
| PV-14 | Editar producto | Modificar el nombre, precio u otro dato de un producto y guardar. | El catálogo refleja los cambios. | Manual |
| PV-15 | Eliminar producto | Eliminar un producto y revisar el catálogo. | El producto deja de aparecer en el catálogo durante la sesión actual. | Manual |
| PV-16 | Agregar al carrito | Agregar un producto desde el catálogo o su detalle. | El producto aparece en el carrito con la cantidad inicial correspondiente. | Manual |
| PV-17 | Cambiar cantidad | Aumentar y disminuir la cantidad de un producto en el carrito. | La cantidad se actualiza y respeta los límites definidos por el componente. | Unitaria / manual |
| PV-18 | Eliminar del carrito | Retirar un producto desde el carrito. | El producto desaparece y el resumen se actualiza. | Manual |
| PV-19 | Resumen del carrito | Agregar varios productos y revisar el subtotal/total. | Los importes corresponden a los precios y cantidades seleccionados. | Manual |
| PV-20 | Navegación y página 404 | Visitar las rutas principales y una dirección inexistente. | Las rutas definidas muestran su vista y una ruta desconocida muestra la página 404. | Manual |
| PV-21 | Diseño adaptable | Revisar inicio, catálogo, formularios y carrito en escritorio y móvil. | El contenido se adapta al ancho disponible sin solapamientos importantes. | Manual |
| PV-22 | Compilación | Ejecutar `npm run build`. | Vite termina la compilación sin errores. | Automatizada |

## 5. Componentes críticos

- `src/utils/validaciones.js`: reglas de validación de formularios.
- `src/utils/auth.js` y `src/context/AuthProvider.jsx`: autenticación y sesión.
- `src/components/RutaPrivada.jsx`: control de acceso a rutas privadas.
- `src/context/ProductosProvider.jsx` y `src/utils/productos.js`: operaciones del catálogo.
- `src/context/CartProvider.jsx` y `src/utils/carrito.js`: estado y operaciones del carrito.
- `src/components/SelectorCantidad.jsx`: selección de cantidad.
- `src/components/FormularioLogin.jsx`, `FormularioRegistro.jsx` y `FormularioProducto.jsx`: captura y validación de datos.
- `src/App.jsx`: configuración de rutas principales.

## 6. Ejecución de pruebas automatizadas

Desde la carpeta raíz del proyecto, ejecutar:

```bash
npm install
npm test -- --run
npm run build
```

Registrar los resultados obtenidos. No marcar una prueba como aprobada si no se ejecutó o si el resultado no coincide con lo esperado.

## 7. Registro de resultados

Completar esta tabla durante la ejecución:

| ID | Estado (Aprobada / Fallida / Pendiente) | Observaciones |
|---|---|---|
| PV-01 a PV-22 | Pendiente de ejecución | Completar luego de ejecutar cada escenario. |

## 8. Limitaciones conocidas

- Los productos se administran en memoria; los cambios del CRUD pueden perderse al recargar la página.
- La autenticación usa credenciales estáticas de demostración y no equivale a un sistema de autenticación de producción.
- La persistencia de sesión se realiza mediante `localStorage`.
- No se prueba un pago real ni una integración con una pasarela de pagos.
- La ejecución real de los escenarios debe confirmarse en el entorno de desarrollo antes de entregar.
