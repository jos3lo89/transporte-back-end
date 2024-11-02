/*
  Warnings:

  - You are about to drop the column `fecha_envio` on the `Encomiendas` table. All the data in the column will be lost.
  - You are about to drop the column `hora_envio` on the `Encomiendas` table. All the data in the column will be lost.
  - Added the required column `fecha_hora_envio` to the `Encomiendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Encomiendas" DROP COLUMN "fecha_envio",
DROP COLUMN "hora_envio",
ADD COLUMN     "fecha_hora_envio" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "num_doc_emisor" SET DATA TYPE TEXT,
ALTER COLUMN "num_telefono_emisor" SET DATA TYPE TEXT,
ALTER COLUMN "num_doc_receptor" SET DATA TYPE TEXT,
ALTER COLUMN "num_telefono_receptor" SET DATA TYPE TEXT;
