-- CreateEnum
CREATE TYPE "EstadoEmpresa" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "Ciudades" AS ENUM ('Andahuaylas', 'Abancay', 'Ayacucho');

-- CreateEnum
CREATE TYPE "RolEmpleados" AS ENUM ('VENDEDOR', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "TiposDocumento" AS ENUM ('DNI', 'Pasaporte');

-- CreateEnum
CREATE TYPE "Generos" AS ENUM ('MASCULINO', 'FEMENIN0');

-- CreateEnum
CREATE TYPE "Estados" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "TiposServicio" AS ENUM ('TRANSPORTE_MIXTO', 'SOLO_ENCOMIENDAS');

-- CreateEnum
CREATE TYPE "Conbustibles" AS ENUM ('GASOLINA', 'DIESEL', 'HIBRIDO', 'ELECTRICO', 'GLP');

-- CreateEnum
CREATE TYPE "TipoEncomienda" AS ENUM ('NORMAL', 'FRAGIL', 'RIGIDO', 'PELIGROSO', 'PERECEDERO');

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nombre_comercial" TEXT NOT NULL,
    "razon_social" TEXT NOT NULL,
    "ruc" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sitio_web" TEXT,
    "tipo_empresa" TEXT NOT NULL,
    "licencia_mtc" TEXT NOT NULL,
    "fecha_licencia" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoEmpresa" NOT NULL DEFAULT 'ACTIVO',
    "fecha_fundacion" TIMESTAMP(3) NOT NULL,
    "logo_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UbicacionTerminal" (
    "id" TEXT NOT NULL,
    "ciudad" "Ciudades" NOT NULL,

    CONSTRAINT "UbicacionTerminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empleados" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "tipo_documento" "TiposDocumento" NOT NULL,
    "num_documento" BIGINT NOT NULL,
    "genero" "Generos" NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "celular" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "direccion_domicilio" TEXT NOT NULL,
    "departameto" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "foto_url" TEXT,
    "estado" "Estados" NOT NULL DEFAULT 'ACTIVO',
    "rol" "RolEmpleados" NOT NULL,
    "terminal_id" TEXT NOT NULL,

    CONSTRAINT "Empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credenciales" (
    "id" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "empleado_id" TEXT NOT NULL,

    CONSTRAINT "Credenciales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conductores" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "tipo_documento" "TiposDocumento" NOT NULL,
    "num_documento" BIGINT NOT NULL,
    "genero" "Generos" NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "celular" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "direccion_domicilio" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "distrito" TEXT NOT NULL,
    "foto_url" TEXT,
    "estado" "Estados" NOT NULL DEFAULT 'ACTIVO',
    "licencia" TEXT NOT NULL,

    CONSTRAINT "Conductores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehiculos" (
    "id" TEXT NOT NULL,
    "tarjeta_de_circulacion" TEXT NOT NULL,
    "numero_de_placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "annio_de_fabricacion" INTEGER NOT NULL,
    "tipo_combustible" "Conbustibles" NOT NULL,
    "color" TEXT NOT NULL,
    "numero_motor" TEXT NOT NULL,
    "cantidad_ruedas" INTEGER NOT NULL,
    "total_asientos" INTEGER NOT NULL,
    "total_pasajeros" INTEGER NOT NULL,
    "peso_seco" INTEGER NOT NULL,
    "peso_bruto" INTEGER NOT NULL,
    "tipo_servicio" "TiposServicio" NOT NULL,
    "estado" "Estados" NOT NULL DEFAULT 'ACTIVO',
    "conductor_id" TEXT NOT NULL,

    CONSTRAINT "Vehiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rutas" (
    "id" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "distancia_km" DECIMAL(5,2) NOT NULL,
    "origen_id" TEXT NOT NULL,
    "destino_id" TEXT NOT NULL,

    CONSTRAINT "Rutas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viajes" (
    "id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "precio" INTEGER NOT NULL,
    "ruta_id" TEXT NOT NULL,
    "vehiculo_id" TEXT NOT NULL,
    "conductor_id" TEXT NOT NULL,

    CONSTRAINT "Viajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pasajeros" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "tipo_documento" "TiposDocumento" NOT NULL,
    "num_documento" BIGINT NOT NULL,
    "destino" "Ciudades" NOT NULL,
    "num_asiento" INTEGER NOT NULL,
    "viaje_id" TEXT NOT NULL,

    CONSTRAINT "Pasajeros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipajes" (
    "id" TEXT NOT NULL,
    "pasajero_id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "peso_kilo" INTEGER NOT NULL,

    CONSTRAINT "Equipajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Encomiendas" (
    "id" TEXT NOT NULL,
    "emisor_nombres" TEXT NOT NULL,
    "num_doc_emisor" INTEGER NOT NULL,
    "num_telefono_emisor" BIGINT NOT NULL,
    "receptor_nombres" TEXT NOT NULL,
    "num_doc_receptor" INTEGER NOT NULL,
    "num_telefono_receptor" BIGINT NOT NULL,
    "fecha_envio" TIMESTAMP(3) NOT NULL,
    "hora_envio" TIMESTAMP(3) NOT NULL,
    "tipo" "TipoEncomienda" NOT NULL,
    "codigo_recogida" INTEGER NOT NULL,
    "peso_kilos" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio_unidad" INTEGER NOT NULL,
    "precio_total" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "terminal_origen_id" TEXT NOT NULL,
    "terminal_destino_id" TEXT NOT NULL,

    CONSTRAINT "Encomiendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boletos" (
    "id" TEXT NOT NULL,
    "pasajero_id" TEXT NOT NULL,
    "viaje_id" TEXT NOT NULL,

    CONSTRAINT "Boletos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_ruc_key" ON "Empresa"("ruc");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_email_key" ON "Empresa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_licencia_mtc_key" ON "Empresa"("licencia_mtc");

-- CreateIndex
CREATE UNIQUE INDEX "UbicacionTerminal_ciudad_key" ON "UbicacionTerminal"("ciudad");

-- CreateIndex
CREATE UNIQUE INDEX "Empleados_email_key" ON "Empleados"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Empleados_terminal_id_key" ON "Empleados"("terminal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Credenciales_usuario_key" ON "Credenciales"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Credenciales_empleado_id_key" ON "Credenciales"("empleado_id");

-- CreateIndex
CREATE UNIQUE INDEX "Conductores_email_key" ON "Conductores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Conductores_licencia_key" ON "Conductores"("licencia");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculos_tarjeta_de_circulacion_key" ON "Vehiculos"("tarjeta_de_circulacion");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculos_numero_de_placa_key" ON "Vehiculos"("numero_de_placa");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculos_numero_motor_key" ON "Vehiculos"("numero_motor");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculos_conductor_id_key" ON "Vehiculos"("conductor_id");

-- CreateIndex
CREATE UNIQUE INDEX "Rutas_origen_id_destino_id_key" ON "Rutas"("origen_id", "destino_id");

-- AddForeignKey
ALTER TABLE "Empleados" ADD CONSTRAINT "Empleados_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "UbicacionTerminal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credenciales" ADD CONSTRAINT "Credenciales_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "Empleados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehiculos" ADD CONSTRAINT "Vehiculos_conductor_id_fkey" FOREIGN KEY ("conductor_id") REFERENCES "Conductores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rutas" ADD CONSTRAINT "Rutas_origen_id_fkey" FOREIGN KEY ("origen_id") REFERENCES "UbicacionTerminal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rutas" ADD CONSTRAINT "Rutas_destino_id_fkey" FOREIGN KEY ("destino_id") REFERENCES "UbicacionTerminal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viajes" ADD CONSTRAINT "Viajes_ruta_id_fkey" FOREIGN KEY ("ruta_id") REFERENCES "Rutas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viajes" ADD CONSTRAINT "Viajes_vehiculo_id_fkey" FOREIGN KEY ("vehiculo_id") REFERENCES "Vehiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viajes" ADD CONSTRAINT "Viajes_conductor_id_fkey" FOREIGN KEY ("conductor_id") REFERENCES "Conductores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pasajeros" ADD CONSTRAINT "Pasajeros_viaje_id_fkey" FOREIGN KEY ("viaje_id") REFERENCES "Viajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipajes" ADD CONSTRAINT "Equipajes_pasajero_id_fkey" FOREIGN KEY ("pasajero_id") REFERENCES "Pasajeros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encomiendas" ADD CONSTRAINT "Encomiendas_terminal_origen_id_fkey" FOREIGN KEY ("terminal_origen_id") REFERENCES "UbicacionTerminal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Encomiendas" ADD CONSTRAINT "Encomiendas_terminal_destino_id_fkey" FOREIGN KEY ("terminal_destino_id") REFERENCES "UbicacionTerminal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletos" ADD CONSTRAINT "Boletos_pasajero_id_fkey" FOREIGN KEY ("pasajero_id") REFERENCES "Pasajeros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boletos" ADD CONSTRAINT "Boletos_viaje_id_fkey" FOREIGN KEY ("viaje_id") REFERENCES "Viajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
