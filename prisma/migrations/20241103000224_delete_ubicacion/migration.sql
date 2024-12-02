/*
  Warnings:

  - You are about to drop the column `departamento` on the `Empleados` table. All the data in the column will be lost.
  - You are about to drop the column `distrito` on the `Empleados` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `Empleados` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Empleados" DROP COLUMN "departamento",
DROP COLUMN "distrito",
DROP COLUMN "provincia";
