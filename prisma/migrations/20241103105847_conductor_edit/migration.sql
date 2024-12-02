/*
  Warnings:

  - You are about to drop the column `departamento` on the `Conductores` table. All the data in the column will be lost.
  - You are about to drop the column `distrito` on the `Conductores` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `Conductores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Conductores" DROP COLUMN "departamento",
DROP COLUMN "distrito",
DROP COLUMN "provincia";
