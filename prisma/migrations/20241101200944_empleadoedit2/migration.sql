/*
  Warnings:

  - You are about to drop the column `departamento` on the `Empleados` table. All the data in the column will be lost.
  - Added the required column `departameto` to the `Empleados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empleados" DROP COLUMN "departamento",
ADD COLUMN     "departameto" TEXT NOT NULL;
