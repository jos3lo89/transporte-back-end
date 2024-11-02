/*
  Warnings:

  - A unique constraint covering the columns `[num_documento]` on the table `Conductores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conductores_num_documento_key" ON "Conductores"("num_documento");
