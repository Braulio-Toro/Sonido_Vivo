-- Roles según la rúbrica: USER y ADMIN (antes "cliente" / "admin")
UPDATE clientes SET rol = 'ADMIN' WHERE LOWER(rol) = 'admin';
UPDATE clientes SET rol = 'USER' WHERE LOWER(rol) IN ('cliente', 'user') OR rol IS NULL;
ALTER TABLE clientes MODIFY rol VARCHAR(30) NOT NULL DEFAULT 'USER';
