-- CreateEnum
CREATE TYPE "EstadoEncomienda" AS ENUM ('RECIBIDO', 'EN_RUTA', 'EN_DESTINO', 'ENTREGADO');

-- AlterTable
ALTER TABLE "Encomiendas" ADD COLUMN     "estado" "EstadoEncomienda" NOT NULL DEFAULT 'RECIBIDO';
