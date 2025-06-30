-- ================================
-- Provincias
-- ================================

INSERT INTO provincias (nombre) VALUES ('Lima');       -- id = 1
INSERT INTO provincias (nombre) VALUES ('Callao');     -- id = 2
INSERT INTO provincias (nombre) VALUES ('Arequipa');   -- id = 3
INSERT INTO provincias (nombre) VALUES ('Cusco');      -- id = 4
INSERT INTO provincias (nombre) VALUES ('La Libertad');-- id = 5

-- ================================
-- Distritos de Lima (provincia_id = 1)
-- ================================

INSERT INTO distritos (nombre, provincia_id) VALUES ('Miraflores', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Surco', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('San Isidro', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Barranco', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('La Molina', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('San Borja', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('San Miguel', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Pueblo Libre', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Chorrillos', 1);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Villa El Salvador', 1);

-- ================================
-- Distritos de Callao (provincia_id = 2)
-- ================================

INSERT INTO distritos (nombre, provincia_id) VALUES ('Callao', 2);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Bellavista', 2);
INSERT INTO distritos (nombre, provincia_id) VALUES ('La Perla', 2);
INSERT INTO distritos (nombre, provincia_id) VALUES ('La Punta', 2);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Carmen de la Legua Reynoso', 2);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Ventanilla', 2);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Mi Perú', 2);

-- ================================
-- Distritos de Arequipa (provincia_id = 3)
-- ================================

INSERT INTO distritos (nombre, provincia_id) VALUES ('Cercado', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Yanahuara', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Cayma', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Cerro Colorado', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Paucarpata', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Mariano Melgar', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Sachaca', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Hunter', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Miraflores', 3);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Alto Selva Alegre', 3);

-- ================================
-- Distritos de Cusco (provincia_id = 4)
-- ================================

INSERT INTO distritos (nombre, provincia_id) VALUES ('Cusco', 4);
INSERT INTO distritos (nombre, provincia_id) VALUES ('San Sebastián', 4);
INSERT INTO distritos (nombre, provincia_id) VALUES ('San Jerónimo', 4);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Santiago', 4);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Wanchaq', 4);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Saylla', 4);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Poroy', 4);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Ccorca', 4);

-- ================================
-- Distritos de La Libertad (provincia_id = 5)
-- ================================

INSERT INTO distritos (nombre, provincia_id) VALUES ('Trujillo', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Huanchaco', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('La Esperanza', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('El Porvenir', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Florencia de Mora', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Moche', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Salaverry', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Laredo', 5);
INSERT INTO distritos (nombre, provincia_id) VALUES ('Víctor Larco Herrera', 5);

-- ================================
-- Inserta inmuebles requeridos para publicaciones
-- ================================

-- 📌 Inmueble id=1
INSERT INTO inmuebles (id, nombre, direccion, tipo, tamano, precio, servicios, provincia, distrito, descripcion, fecha_creacion, imagen)
VALUES
    (1, 'Departamento A', 'Av. Siempre Viva 123', 'Departamento', 80, 1500.0, 'Wifi,Agua caliente', 'Lima', 'Miraflores', 'Depto bonito', NOW(), 'https://link1.com');

-- 📌 Inmueble id=2
INSERT INTO inmuebles (id, nombre, direccion, tipo, tamano, precio, servicios, provincia, distrito, descripcion, fecha_creacion, imagen)
VALUES
    (2, 'Inmueble 2', 'Av. Siempre Viva 742', 'DEPARTAMENTO', 80, 1000.00, 'agua,luz,internet', 'Lima', 'Miraflores', 'Departamento amplio en Miraflores', CURRENT_TIMESTAMP, 'imagen2.jpg');

-- Otros inmuebles requeridos para casos válidos
INSERT INTO inmuebles (id, nombre, direccion, tipo, tamano, precio, servicios, provincia, distrito, descripcion, fecha_creacion, imagen)
VALUES
    (4, 'Inmueble 4', 'Calle Los Rosales 123', 'DEPARTAMENTO', 120, 1500.00, 'agua,luz,internet', 'Lima', 'San Isidro', 'Departamento en San Isidro', CURRENT_TIMESTAMP, 'imagen4.jpg'),
    (8, 'Inmueble 8', 'Jr. Las Flores 456', 'CUARTO', 20, 800.00, 'agua,luz', 'Lima', 'Surco', 'Cuarto en Surco', CURRENT_TIMESTAMP, 'imagen8.jpg'),
    (10, 'Inmueble 10', 'Av. Principal 789', 'DEPARTAMENTO', 90, 2000.00, 'agua,luz,internet', 'Lima', 'La Molina', 'Departamento en La Molina', CURRENT_TIMESTAMP, 'imagen10.jpg');

-- ================================
-- Inserta publicaciones
-- ================================

-- 📌 Publicacion 1 vinculada a inmueble id=1
INSERT INTO publicaciones_tr (arrendatario, precio, inmueble_id, servicios_extra, referencias_extra)
VALUES ('Juan Pérez', 1600.0, 1, 'Incluye limpieza semanal', 'Cerca de parque');

-- Servicios de la publicacion 1
INSERT INTO publicaciontrentity_servicios (publicaciontrentity_id, servicios)
VALUES (1, 'Wifi'),
       (1, 'Agua caliente');

-- 📌 Publicacion 2 vinculada a inmueble id=2
INSERT INTO publicaciones_tr (arrendatario, precio, inmueble_id, servicios_extra, referencias_extra)
VALUES ('María López', 2800.0, 2, 'Incluye mantenimiento mensual', 'A 5 min de supermercado');

-- Servicios de la publicacion 2
INSERT INTO publicaciontrentity_servicios (publicaciontrentity_id, servicios)
VALUES (2, 'Wifi'),
       (2, 'Jardin'),
       (2, 'Parrilla');

-- ================================
-- Inserta usuarios requeridos para los casos válidos
-- ================================

INSERT INTO usuarios (id, nombre_completo, telefono, correo, activo)
VALUES
    (1, 'Usuario1', '999111222', 'usuario1@example.com', true),
    (3, 'Usuario3', '999333444', 'usuario3@example.com', true),
    (5, 'Usuario5', '999555666', 'usuario5@example.com', true),
    (7, 'Usuario7', '999777888', 'usuario7@example.com', true);
