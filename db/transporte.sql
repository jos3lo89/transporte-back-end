CREATE DATABASE transportes;

-- Tabla Empresa
CREATE TABLE Empresa
(
    id               SERIAL PRIMARY KEY,
    nombre_comercial VARCHAR(100) NOT NULL,
    razon_social     VARCHAR(150) NOT NULL,
    ruc              CHAR(11)     NOT NULL UNIQUE, -- RUC de 11 dígitos
    direccion        VARCHAR(150) NOT NULL,
    departamento     VARCHAR(50)  NOT NULL,
    provincia        VARCHAR(50)  NOT NULL,
    distrito         VARCHAR(50)  NOT NULL,
    telefono         VARCHAR(15),
    email            VARCHAR(100) NOT NULL,
    sitio_web        VARCHAR(100),
    tipo_empresa     VARCHAR(50)  NOT NULL,        -- e.g., Transporte terrestre de pasajeros
    licencia_mtc     VARCHAR(20) UNIQUE,           -- Número de licencia emitida por el MTC
    fecha_licencia   DATE,                         -- Fecha de emisión de la licencia
    estado           VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    fecha_creacion   DATE        DEFAULT CURRENT_DATE,
    logo_url         VARCHAR(150)                  -- URL de imagen del logo de la empresa
);


-- Tabla UbicacionTerminal
CREATE TABLE UbicacionTerminal
(
    id     SERIAL PRIMARY KEY,
    ciudad VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla Empleados
CREATE TABLE Empleados
(
    id                  SERIAL PRIMARY KEY,
    nombres             VARCHAR(100) NOT NULL,
    apellidos           VARCHAR(100) NOT NULL,
    tipo_documento      VARCHAR(20)  NOT NULL,
    n_documento         VARCHAR(20)  NOT NULL UNIQUE,
    genero              VARCHAR(10)  NOT NULL,
    fecha_nacimiento    DATE         NOT NULL,
    celular             VARCHAR(15),
    email               VARCHAR(100) NOT NULL UNIQUE,
    direccion_domicilio VARCHAR(150),
    departamento        VARCHAR(50),
    provincia           VARCHAR(50),
    distrito            VARCHAR(50),
    perfil              VARCHAR(50),
    foto_url            VARCHAR(150),
    estado              VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    rol                 VARCHAR(50)  NOT NULL,
    terminal_id         INT          REFERENCES UbicacionTerminal (id) ON DELETE SET NULL
);

-- Tabla Credenciales
CREATE TABLE Credenciales
(
    id          SERIAL PRIMARY KEY,
    empleado_id INT REFERENCES Empleados (id) ON DELETE CASCADE,
    usuario     VARCHAR(100) NOT NULL UNIQUE,
    clave       VARCHAR(100) NOT NULL
);

-- Tabla Conductores
CREATE TABLE Conductores
(
    id                  SERIAL PRIMARY KEY,
    nombres             VARCHAR(100) NOT NULL,
    apellidos           VARCHAR(100) NOT NULL,
    tipo_documento      VARCHAR(20)  NOT NULL,
    n_documento         VARCHAR(20)  NOT NULL UNIQUE,
    genero              VARCHAR(10)  NOT NULL,
    fecha_nacimiento    DATE         NOT NULL,
    celular             VARCHAR(15),
    email               VARCHAR(100) UNIQUE,
    direccion_domicilio VARCHAR(150),
    departamento        VARCHAR(50),
    provincia           VARCHAR(50),
    distrito            VARCHAR(50),
    foto_url            VARCHAR(150),
    estado              VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    licencia            VARCHAR(20)  NOT NULL UNIQUE
);

-- Tabla Vehiculos
CREATE TABLE Vehiculos
(
    id                     SERIAL PRIMARY KEY,
    propietario            VARCHAR(100) NOT NULL,
    tarjeta_de_circulacion VARCHAR(50)  NOT NULL UNIQUE,
    numero_de_placa        VARCHAR(10)  NOT NULL UNIQUE,
    clase                  VARCHAR(50)  NOT NULL,
    marca                  VARCHAR(50)  NOT NULL,
    año_de_fabricacion     INT          NOT NULL CHECK (año_de_fabricacion > 1900),
    modelo                 VARCHAR(50)  NOT NULL,
    tipo_combustible       VARCHAR(20)  NOT NULL,
    carroceria             VARCHAR(20),
    ejes                   INT,
    color                  VARCHAR(20),
    numero_motor           VARCHAR(50)  NOT NULL UNIQUE,
    cantidad_cilindros     INT,
    numero_serie           VARCHAR(50)  NOT NULL UNIQUE,
    cantidad_ruedas        INT,
    peso_seco              DECIMAL(10, 2),
    peso_bruto             DECIMAL(10, 2),
    longitud               DECIMAL(5, 2),
    altura                 DECIMAL(5, 2),
    ancho                  DECIMAL(5, 2),
    total_pasajeros        INT          NOT NULL CHECK (total_pasajeros > 0),
    total_asientos         INT          NOT NULL CHECK (total_asientos > 0),
    tipo_servicio          VARCHAR(50)  NOT NULL,
    estado                 VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    conductor_id           INT          REFERENCES Conductores (id) ON DELETE SET NULL
);

-- Tabla Rutas
CREATE TABLE Rutas
(
    id           SERIAL PRIMARY KEY,
    origen_id    INT REFERENCES UbicacionTerminal (id) ON DELETE CASCADE,
    destino_id   INT REFERENCES UbicacionTerminal (id) ON DELETE CASCADE,
    duracion     INTERVAL      NOT NULL,
    distancia_km DECIMAL(5, 2) NOT NULL,
    UNIQUE (origen_id, destino_id)
);

-- Tabla Viajes
CREATE TABLE Viajes
(
    id           SERIAL PRIMARY KEY,
    fecha        DATE           NOT NULL,
    hora         TIME           NOT NULL,
    ruta_id      INT REFERENCES Rutas (id) ON DELETE CASCADE,
    vehiculo_id  INT            REFERENCES Vehiculos (id) ON DELETE SET NULL,
    conductor_id INT            REFERENCES Conductores (id) ON DELETE SET NULL,
    precio       DECIMAL(10, 2) NOT NULL
);

-- Tabla Pasajeros
CREATE TABLE Pasajeros
(
    id             SERIAL PRIMARY KEY,
    nombres        VARCHAR(100) NOT NULL,
    apellidos      VARCHAR(100) NOT NULL,
    tipo_documento VARCHAR(20)  NOT NULL,
    n_documento    VARCHAR(20)  NOT NULL UNIQUE,
    destino        VARCHAR(100) NOT NULL,
    estado         VARCHAR(20) DEFAULT 'activo' CHECK (estado IN ('activo', 'inactivo')),
    num_asiento    INT          NOT NULL CHECK (num_asiento > 0),
    viaje_id       INT REFERENCES Viajes (id) ON DELETE CASCADE
);

-- Tabla Equipajes
CREATE TABLE Equipajes
(
    id          SERIAL PRIMARY KEY,
    pasajero_id INT REFERENCES Pasajeros (id) ON DELETE CASCADE,
    descripcion TEXT          NOT NULL,
    peso_kilo   DECIMAL(5, 2) NOT NULL CHECK (peso_kilo > 0)
);

-- Tabla Encomiendas
CREATE TABLE Encomiendas
(
    id                    SERIAL PRIMARY KEY,
    emisor_nombres        VARCHAR(100)   NOT NULL,
    receptor_nombres      VARCHAR(100)   NOT NULL,
    num_doc_emisor        VARCHAR(20)    NOT NULL,
    num_doc_receptor      VARCHAR(20)    NOT NULL,
    num_telefono_emisor   VARCHAR(15),
    num_telefono_receptor VARCHAR(15),
    fecha_envio           DATE           NOT NULL,
    hora_envio            TIME           NOT NULL,
    tipo                  VARCHAR(50)    NOT NULL,
    codigo_recogida       VARCHAR(20)    NOT NULL UNIQUE,
    peso_kilos            DECIMAL(5, 2)  NOT NULL CHECK (peso_kilos > 0),
    descripcion           TEXT,
    precio_unidad         DECIMAL(10, 2) NOT NULL,
    precio_total          DECIMAL(10, 2) NOT NULL,
    cantidad              INT            NOT NULL CHECK (cantidad > 0),
    terminal_origen_id    INT            REFERENCES UbicacionTerminal (id) ON DELETE SET NULL,
    terminal_destino_id   INT            REFERENCES UbicacionTerminal (id) ON DELETE SET NULL
);

-- Tabla Boletos
CREATE TABLE Boletos
(
    id          SERIAL PRIMARY KEY,
    pasajero_id INT REFERENCES Pasajeros (id) ON DELETE CASCADE,
    viaje_id    INT REFERENCES Viajes (id) ON DELETE CASCADE,
    asiento     INT            NOT NULL CHECK (asiento > 0),
    precio      DECIMAL(10, 2) NOT NULL
);


ALTER TABLE "Empleados" DROP COLUMN "departameto",
ADD COLUMN     "departamento" TEXT NOT NULL;


