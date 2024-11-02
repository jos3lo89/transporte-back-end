/*
  Warnings:

  - A unique constraint covering the columns `[num_documento]` on the table `Empleados` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Empleados" ALTER COLUMN "num_documento" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Empleados_num_documento_key" ON "Empleados"("num_documento");
