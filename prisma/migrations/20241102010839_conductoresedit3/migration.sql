/*
  Warnings:

  - You are about to drop the column `distritoo` on the `Conductores` table. All the data in the column will be lost.
  - Added the required column `distrito` to the `Conductores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conductores" DROP COLUMN "distritoo",
ADD COLUMN     "distrito" TEXT NOT NULL;
