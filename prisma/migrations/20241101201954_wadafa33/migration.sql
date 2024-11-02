/*
  Warnings:

  - You are about to drop the column `departamento33` on the `Conductores` table. All the data in the column will be lost.
  - Added the required column `departamento` to the `Conductores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conductores" DROP COLUMN "departamento33",
ADD COLUMN     "departamento" TEXT NOT NULL;
