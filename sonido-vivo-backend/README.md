# Sonido Vivo – Backend (Spring Boot 4 + MySQL + JWT + Swagger)

API REST con CRUD completo de **Productos**, **Clientes** y **Ventas**, autenticación JWT con roles **USER** y **ADMIN**,
DTOs + mappers, HATEOAS en los GET, documentación Swagger/OpenAPI, pruebas JUnit (DataFaker) y migraciones Flyway.

## 1. Requisitos
- JDK 25 · Maven (o el de IntelliJ) · MySQL/MariaDB en `localhost:3306`
- Usuario/clave de MySQL: variables `DB_USER` / `DB_PASSWORD` (por defecto `root` y vacía) o edita `application.properties`.

## 2. Ejecutar (orden: base de datos → backend → frontend)
1. Inicia MySQL (la base `sonido_vivo` se crea sola).
2. En esta carpeta: `mvn clean spring-boot:run`
3. Backend: http://localhost:8081 · Swagger: http://localhost:8081/swagger-ui.html
4. Frontend (otra carpeta, VS Code): `npm install` y `npm run dev` → http://localhost:5173
   (en `.env` del frontend: `VITE_API_URL=http://localhost:8081`)

Si ya tenías una base `sonido_vivo` de intentos anteriores y algo falla: `DROP DATABASE sonido_vivo;` y vuelve a iniciar.
Pruebas: `mvn test`.

## 3. Base de datos y scripts
- **Con Flyway (recomendado):** al iniciar se aplican `src/main/resources/db/migration`
  - `V1` crea las tablas · `V2` agrega `nivel` · `V3` normaliza roles a USER/ADMIN · `V4` pobla 12 productos, 3 usuarios y 3 ventas.
- **Sin Flyway (a mano):** `database/sonido_vivo_script_completo.sql` crea y puebla la base completa
  (solo en ese caso pon `spring.flyway.enabled=false`; no lo ejecutes si usas Flyway).

Usuarios de prueba: `admin@duoc.cl / admin123` (**ADMIN**) · `cliente@gmail.com / 1234` (**USER**) · `maria.soto@gmail.com / 1234` (**USER**)

## 4. Endpoints y permisos
| Recurso | GET | POST | PUT | DELETE |
|---|---|---|---|---|
| `/api/auth/login`, `/api/auth/register` | – | público | – | – |
| `/api/productos` | público | ADMIN | ADMIN | ADMIN |
| `/api/clientes` | ADMIN | ADMIN | ADMIN | ADMIN |
| `/api/ventas` | USER/ADMIN | USER/ADMIN | USER/ADMIN | ADMIN |

Sin token → 401. Con token pero sin rol suficiente → 403.

## 5. Probar desde Swagger
1. `POST /api/auth/login` con `{"correo":"admin@duoc.cl","password":"admin123"}`.
2. Copia el `token` → botón **Authorize** → pégalo (sin la palabra Bearer) → Authorize.
3. Ejecuta cualquier endpoint con **Try it out**.

## 6. Estructura
`controller` (endpoints + Swagger) · `dto` (request/response) · `mapper` (entidad ⇄ DTO) · `service` · `repository` · `model` (entidades JPA)
· `security` (JWT) · `config` (Security, CORS, OpenAPI) · `exception` (formato único de error) · `docs` (esquemas HAL para Swagger).
