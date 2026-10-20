# Especificación de Requisitos de Software (ERS) — Sonido Vivo

**Versión:** 1.0  
**Estado:** Documento de requisitos actualizado según la implementación React revisada.  
**Sistema:** Sonido Vivo — tienda web de instrumentos musicales.

## 1. Introducción

### 1.1 Propósito

Este documento describe los requisitos funcionales y no funcionales de la versión React de Sonido Vivo. Sirve como referencia para comprender las funcionalidades presentes y orientar su validación mediante pruebas.

### 1.2 Alcance

Sonido Vivo es un sitio web orientado a presentar una tienda de instrumentos musicales. Permite recorrer páginas informativas, consultar el catálogo y el detalle de productos, utilizar formularios de autenticación y registro, gestionar un carrito y acceder a una vista de administración para realizar operaciones básicas sobre productos.

La versión revisada funciona principalmente en el cliente. Los productos se manejan en memoria y la sesión utiliza `localStorage`. No se declara una integración con una base de datos, servidor de autenticación, pasarela de pago ni procesamiento de pedidos reales.

### 1.3 Usuarios

- **Visitante:** puede navegar por las páginas públicas y consultar el catálogo.
- **Usuario autenticado:** puede acceder a las rutas privadas contempladas por la aplicación, como el perfil.
- **Usuario con sesión iniciada:** puede acceder a la vista de administración según la protección de rutas actualmente implementada. La versión revisada no debe considerarse un sistema con autorización por roles de producción.

## 2. Descripción general

### 2.1 Perspectiva del producto

La aplicación está construida con React y Vite, utiliza React Router para la navegación y React Bootstrap en componentes de interfaz. Su código se organiza en vistas, componentes, contextos, hooks, datos y utilidades.

### 2.2 Funciones principales

- Mostrar la página de inicio y contenido informativo.
- Mostrar un catálogo de instrumentos y productos.
- Consultar el detalle de un producto.
- Buscar o filtrar productos mediante los controles disponibles en la interfaz.
- Agregar productos al carrito, modificar cantidades y retirar artículos.
- Mostrar un resumen del carrito.
- Registrar datos desde formularios y validar campos.
- Iniciar y cerrar sesión mediante el flujo de autenticación implementado.
- Mantener la información de sesión en `localStorage`.
- Proteger rutas privadas.
- Crear, editar y eliminar productos en el catálogo durante la sesión de uso.
- Mostrar una página para rutas inexistentes.

### 2.3 Restricciones y supuestos

- La aplicación necesita un navegador moderno compatible con React.
- El proyecto se ejecuta en desarrollo mediante Vite.
- Los datos del catálogo se gestionan en el cliente.
- Los cambios realizados al catálogo no tienen persistencia garantizada al recargar la aplicación.
- Las credenciales son estáticas y están destinadas a una demostración académica.
- La protección de rutas en el cliente no sustituye controles de seguridad en un servidor.
- El sistema no realiza cobros ni confirma compras reales.

## 3. Requisitos funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RF-01 | Navegación principal | El usuario puede acceder a las vistas principales mediante las rutas definidas. |
| RF-02 | Página de inicio | El sistema muestra el contenido principal de la tienda y sus secciones informativas. |
| RF-03 | Catálogo | El sistema presenta los productos disponibles con información relevante. |
| RF-04 | Búsqueda y filtros | El usuario puede utilizar los mecanismos de búsqueda o filtrado disponibles para encontrar productos. |
| RF-05 | Detalle del producto | El usuario puede abrir un producto y consultar su información detallada. |
| RF-06 | Carrito | El usuario puede agregar productos al carrito y consultar los artículos seleccionados. |
| RF-07 | Cantidades | El usuario puede modificar la cantidad de un artículo, respetando los límites definidos por la interfaz. |
| RF-08 | Retirar artículos | El usuario puede eliminar artículos del carrito. |
| RF-09 | Resumen del carrito | El sistema calcula y presenta los importes correspondientes a los productos y cantidades seleccionados. |
| RF-10 | Registro | El sistema permite ingresar datos en el formulario de registro y valida los campos definidos. |
| RF-11 | Inicio de sesión | El sistema comprueba las credenciales estáticas configuradas para la demostración. |
| RF-12 | Persistencia de sesión | La aplicación guarda y recupera el estado de sesión mediante `localStorage`, según su implementación. |
| RF-13 | Rutas privadas | El sistema restringe las vistas protegidas cuando no existe una sesión válida. |
| RF-14 | Administración de productos | La vista de administración permite crear, editar y eliminar productos en el estado de la aplicación. |
| RF-15 | Imagen genérica | Cuando corresponde y no se entrega una imagen propia, el sistema puede utilizar la imagen genérica configurada. |
| RF-16 | Validación de formularios | El sistema comprueba los datos de los formularios y presenta errores cuando los valores no cumplen las reglas. |
| RF-17 | Contenido informativo | El sistema permite consultar páginas como Nosotros, Contacto y Blog, incluidas las vistas de detalle de publicaciones que estén definidas. |
| RF-18 | Página no encontrada | Una ruta que no corresponda a una vista válida muestra una página 404. |

## 4. Requisitos no funcionales

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RNF-01 | Usabilidad | Los controles y formularios deben ser comprensibles y presentar mensajes de validación cuando corresponda. |
| RNF-02 | Diseño adaptable | La interfaz debe adaptarse a diferentes tamaños de pantalla, especialmente escritorio y móvil. |
| RNF-03 | Mantenibilidad | El código debe mantenerse organizado en componentes, vistas, contextos, hooks y utilidades con responsabilidades diferenciadas. |
| RNF-04 | Compatibilidad | La aplicación debe funcionar en versiones actuales de navegadores modernos compatibles con React. |
| RNF-05 | Integridad de la interfaz | Los datos presentados en catálogo, carrito y formularios deben reflejar el estado actual de la aplicación. |
| RNF-06 | Calidad | Las funciones críticas deben poder validarse mediante pruebas unitarias y pruebas funcionales. |
| RNF-07 | Seguridad de demostración | Las rutas privadas deben comprobar el estado de autenticación en el cliente. Esta medida no se considera suficiente para proteger recursos reales en producción. |

## 5. Interfaces y rutas

La aplicación utiliza React Router. Las rutas contempladas incluyen:

- Inicio: `/`
- Catálogo: `/productos`
- Detalle de producto: `/productos/:id` (o el patrón de identificador definido en el código)
- Inicio de sesión: `/login`
- Registro: `/registro`
- Administración: `/admin`
- Carrito: `/carrito`
- Perfil: `/perfil`
- Páginas informativas: Nosotros, Contacto y Blog, según las rutas definidas en `src/App.jsx`
- Ruta no encontrada: vista 404

Los nombres exactos de las rutas deben mantenerse sincronizados con la configuración vigente en `src/App.jsx`.

## 6. Organización técnica

- `src/views/`: vistas o páginas de la aplicación.
- `src/components/`: componentes reutilizables de interfaz.
- `src/context/`: proveedores y contextos compartidos para autenticación, productos y carrito.
- `src/hooks/`: hooks reutilizables para acceder a funcionalidades o manejar formularios.
- `src/utils/`: funciones auxiliares, validaciones y lógica del carrito, autenticación y productos.
- `src/data/`: datos iniciales del catálogo y contenido informativo.
- `src/tests/`: pruebas automatizadas con Vitest.

## 7. Reglas y límites del sistema

1. Los formularios deben respetar las reglas de validación definidas en las utilidades del proyecto.
2. El carrito debe actualizarse al agregar, modificar o eliminar artículos.
3. El resumen del carrito debe calcularse usando las cantidades y precios vigentes.
4. Las funciones administrativas modifican el estado del catálogo en memoria.
5. La sesión se almacena en el navegador; borrar los datos locales puede cerrar la sesión.
6. La aplicación es una demostración académica y no debe utilizarse como tienda de producción sin implementar un backend, almacenamiento persistente, autorización segura y procesamiento real de pedidos.

## 8. Verificación y trazabilidad

Los requisitos se verifican mediante el archivo `plan_de_pruebas.md` y las pruebas unitarias ubicadas en `src/tests/`. Las validaciones principales incluyen autenticación, utilidades de validación, carrito, selector de cantidad y operaciones del catálogo.

La existencia de un requisito en este documento no significa por sí sola que haya sido probado con éxito. Los resultados deben registrarse tras ejecutar las pruebas en el entorno del proyecto.

## 9. Mantenimiento del documento

Si se agregan o eliminan rutas, campos, validaciones o funcionalidades, este documento y el plan de pruebas deben actualizarse para representar el comportamiento real del sistema.
