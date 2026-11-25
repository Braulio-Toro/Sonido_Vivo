# Sonido Vivo – Frontend (React + Vite)

## 1. Imágenes (importante)
Copia TU carpeta de imágenes a `src/assets/img/` y el video a `src/assets/vid/`. Archivos usados:
`Ampli.png Bajo.png Bajo2.png Bateria.png Bateria2.png Blog1.png Blog2.png Brad_Pitt.png Cuerdas.png Fondo2.jpg Gabe.jpg Guitarra.png Micro.png Micro2.png Pedal.png Pedal2.png Rachel.jpg Teclado.png banda.jpg logo2.png` y `video_banda.mp4`.
Opcional: `public/favicon.png`.

## 2. Ejecutar
```
npm install
npm run dev        # http://localhost:5173
npm test
```
La URL del backend está en `.env` (`VITE_API_URL=http://localhost:8080`). El backend debe estar corriendo primero.

## 3. Cómo se conecta (método RESTful)
- `src/services/api.js`: instancia de axios con la URL base e interceptor que agrega `Authorization: Bearer <token>`.
- `ProductosService`, `AuthService`, `VentasService`, `ClientesService`: funciones async que devuelven `response.data`.
- `src/utils/api.js`: traduce respuestas HATEOAS y nombres de campos (`fono`↔`telefono`, `fenac`↔`fechaNacimiento`, `pass`↔`password`).
- `ProductosProvider`: carga el catálogo con GET `/api/productos` y hace POST/PUT/DELETE desde el Panel (solo admin).
- `AuthProvider`: login/registro reales contra `/api/auth/*`, guarda el JWT.
- Carrito: al pagar crea una venta por producto en POST `/api/ventas`.

Cuentas demo: `admin@duoc.cl / admin123` y `cliente@gmail.com / 1234`.
