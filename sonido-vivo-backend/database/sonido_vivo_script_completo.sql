-- =====================================================================
--  Sonido Vivo - Script completo de creación y población (MySQL 8 / MariaDB)
--  Úsalo SOLO si ejecutas la base a mano. Para correr el backend con Flyway
--  NO lo ejecutes: Flyway aplica estas mismas migraciones (V1..V4) al iniciar.
--  Si lo usas, cambia en application.properties:  spring.flyway.enabled=false
--  Usuarios de prueba:  admin@duoc.cl / admin123 (ADMIN)
--                       cliente@gmail.com / 1234 (USER)
-- =====================================================================
DROP DATABASE IF EXISTS sonido_vivo;
CREATE DATABASE sonido_vivo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sonido_vivo;

-- ---------- V1__init_schema.sql ----------
CREATE TABLE clientes (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          rut VARCHAR(12) NOT NULL UNIQUE,
                          nombre VARCHAR(100) NOT NULL,
                          correo VARCHAR(150) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          telefono VARCHAR(15),
                          fecha_nacimiento DATE NOT NULL,
                          instrumento VARCHAR(100) NOT NULL,
                          rol VARCHAR(30) DEFAULT 'cliente'
);

CREATE TABLE productos (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           codigo VARCHAR(50) NOT NULL UNIQUE,
                           nombre VARCHAR(100) NOT NULL,
                           categoria VARCHAR(80) NOT NULL,
                           marca VARCHAR(80) NOT NULL,
                           precio INT NOT NULL,
                           stock INT NOT NULL,
                           descripcion VARCHAR(300) NOT NULL,
                           imagen VARCHAR(255) DEFAULT '/img/producto-generico.png'
);

CREATE TABLE ventas (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        cliente_id BIGINT NOT NULL,
                        producto_id BIGINT NOT NULL,
                        cantidad INT NOT NULL,
                        cupon_codigo VARCHAR(50),
                        total INT NOT NULL,
                        fecha DATE NOT NULL,
                        estado VARCHAR(30) NOT NULL DEFAULT 'PAGADO',
                        CONSTRAINT fk_ventas_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
                        CONSTRAINT fk_ventas_producto FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- ---------- V2__add_nivel_clientes.sql ----------
ALTER TABLE clientes ADD COLUMN nivel VARCHAR(50);

-- ---------- V3__roles_user_admin.sql ----------
-- Roles según la rúbrica: USER y ADMIN (antes "cliente" / "admin")
UPDATE clientes SET rol = 'ADMIN' WHERE LOWER(rol) = 'admin';
UPDATE clientes SET rol = 'USER' WHERE LOWER(rol) IN ('cliente', 'user') OR rol IS NULL;
ALTER TABLE clientes MODIFY rol VARCHAR(30) NOT NULL DEFAULT 'USER';

-- ---------- V4__datos_iniciales.sql ----------
-- Datos iniciales de Sonido Vivo (productos, usuarios y ventas de ejemplo).
-- INSERT IGNORE: si el dato ya existe (por ejemplo en una base creada antes) se omite sin error.

-- ===== Productos (12) =====
INSERT IGNORE INTO productos (codigo, nombre, categoria, marca, precio, stock, descripcion) VALUES
    ('SV-GTR-001', 'Fender Stratocaster Sunburst', 'Guitarras', 'Fender', 899990, 5, 'Guitarra eléctrica de sonido versátil, clásico y definido. Ideal para presentaciones en vivo y sesiones de estudio.'),
    ('SV-BAJ-001', 'Fender Precision Bass® Deluxe Duff McKagan', 'Bajos', 'Fender', 1999990, 2, 'Bajo eléctrico de 4 cuerdas con carácter potente y acabado negro.'),
    ('SV-BAT-001', 'Batería acústica 5 piezas', 'Baterías', 'Genérica', 489990, 4, 'Batería acústica completa de 5 piezas, ideal para sala de ensayo.'),
    ('SV-AMP-001', 'Amplificador Vox', 'Amplificadores', 'Vox', 189990, 6, 'Amplificador de válvulas para guitarra con timbre cálido.'),
    ('SV-TEC-001', 'Teclado digital 61 teclas', 'Teclados', 'Genérica', 159990, 8, 'Teclado digital de 61 teclas con sonidos variados para principiantes.'),
    ('SV-MIC-001', 'Micrófono dinámico vocal', 'Micrófonos', 'Genérica', 49990, 15, 'Micrófono dinámico ideal para presentaciones en vivo.'),
    ('SV-PED-001', 'Pedal de distorsión ZOOM G6', 'Pedales de efectos', 'Zoom', 34990, 10, 'Efecto clásico de distorsión para guitarra eléctrica.'),
    ('SV-ACC-001', 'Cuerdas D''dario Guitarra', 'Accesorios', 'D''Addario', 12990, 30, 'Set de cuerdas para guitarra, brillo y durabilidad.'),
    ('SV-MIC-002', 'Micrófono condensador de estudio', 'Micrófonos', 'Genérica', 79990, 9, 'Micrófono condensador para grabación en estudio.'),
    ('SV-BAJ-002', 'KAYSEN BK5 Bajo Eléctrico 5 cuerdas Activo - Natural', 'Bajos', 'Kaysen', 279990, 3, 'Bajo eléctrico activo de 5 cuerdas, acabado natural.'),
    ('SV-BAT-002', 'Batería electrónica compacta', 'Baterías', 'Genérica', 399990, 4, 'Batería electrónica compacta para practicar sin ruido.'),
    ('SV-PED-002', 'Pedal de delay Whammy', 'Pedales de efectos', 'Digitech', 39990, 7, 'Pedal de efectos con pitch y delay para guitarra.');

-- ===== Usuarios (contraseñas cifradas con BCrypt) =====
-- admin@duoc.cl / admin123  (ADMIN)   |   cliente@gmail.com / 1234  (USER)   |   maria.soto@gmail.com / 1234  (USER)
INSERT IGNORE INTO clientes (rut, nombre, correo, password, telefono, fecha_nacimiento, instrumento, nivel, rol) VALUES
    ('111111111', 'Administrador Sonido Vivo', 'admin@duoc.cl', '$2a$10$s84qY9YR6LxGjViuHxpRX.ZSa7IenamZJI4RzczOa/mapPcbycpSG', '+56912345678', '1990-01-01', 'Guitarra', 'Profesional', 'ADMIN'),
    ('222222222', 'Cliente Demo', 'cliente@gmail.com', '$2a$10$zZqDGDSzfJrzjMnBOlwEq.63E58m/uq/6M.7E2iWpioxNDm1LdD9a', NULL, '2000-05-10', 'Bajo', 'Intermedio', 'USER'),
    ('190110229', 'María Soto', 'maria.soto@gmail.com', '$2a$10$OPW5O7rHpWJHucO6Jsy4c.KATdmKGzPpriEJTVgIcTDfss0XVM1QW', '+56987654321', '1998-03-22', 'Batería', 'Avanzado', 'USER');

-- ===== Ventas de ejemplo (se buscan cliente y producto por correo/código) =====
INSERT INTO ventas (cliente_id, producto_id, cantidad, cupon_codigo, total, fecha, estado)
SELECT c.id, p.id, 1, NULL, p.precio, '2026-11-10', 'PAGADO'
FROM clientes c JOIN productos p ON p.codigo = 'SV-GTR-001' WHERE c.correo = 'cliente@gmail.com';

INSERT INTO ventas (cliente_id, producto_id, cantidad, cupon_codigo, total, fecha, estado)
SELECT c.id, p.id, 2, 'SONIDO10', ROUND(p.precio * 2 * 0.9), '2026-11-12', 'PAGADO'
FROM clientes c JOIN productos p ON p.codigo = 'SV-PED-001' WHERE c.correo = 'maria.soto@gmail.com';

INSERT INTO ventas (cliente_id, producto_id, cantidad, cupon_codigo, total, fecha, estado)
SELECT c.id, p.id, 1, NULL, p.precio, '2026-11-15', 'PENDIENTE'
FROM clientes c JOIN productos p ON p.codigo = 'SV-BAT-001' WHERE c.correo = 'maria.soto@gmail.com';
