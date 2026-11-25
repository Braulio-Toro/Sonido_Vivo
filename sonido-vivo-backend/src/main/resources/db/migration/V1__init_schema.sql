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