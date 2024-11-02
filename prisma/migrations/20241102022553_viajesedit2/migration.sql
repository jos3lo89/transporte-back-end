/*
  Warnings:

  - You are about to drop the column `hora` on the `Viajes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Viajes" DROP COLUMN "hora",
ALTER COLUMN "fecha" SET DATA TYPE TIMESTAMP(3);
