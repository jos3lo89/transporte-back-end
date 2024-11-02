/*
  Warnings:

  - Added the required column `updatedAt` to the `Boletos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Conductores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Credenciales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Encomiendas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Equipajes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Pasajeros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Rutas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UbicacionTerminal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vehiculos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Viajes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Boletos" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Conductores" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fecha_nacimiento" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Credenciales" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Empleados" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fecha_nacimiento" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Empresa" ALTER COLUMN "fecha_licencia" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Encomiendas" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fecha_envio" SET DATA TYPE DATE,
ALTER COLUMN "hora_envio" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "Equipajes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Pasajeros" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Rutas" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UbicacionTerminal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Vehiculos" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Viajes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "fecha" SET DATA TYPE DATE;
