/*
  Warnings:

  - You are about to drop the column `distrito` on the `Conductores` table. All the data in the column will be lost.
  - Added the required column `distritoo` to the `Conductores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conductores" DROP COLUMN "distrito",
ADD COLUMN     "distritoo" TEXT NOT NULL;
