/*
  Warnings:

  - Added the required column `hora` to the `Viajes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Viajes" ADD COLUMN     "hora" TIME NOT NULL;
