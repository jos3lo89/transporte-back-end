-- CreateTable
CREATE TABLE "AsientosVendidos" (
    "id" TEXT NOT NULL,
    "num_asiento" INTEGER NOT NULL,
    "pasajero_id" TEXT NOT NULL,
    "viaje_id" TEXT NOT NULL,

    CONSTRAINT "AsientosVendidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AsientosVendidos_num_asiento_viaje_id_key" ON "AsientosVendidos"("num_asiento", "viaje_id");

-- AddForeignKey
ALTER TABLE "AsientosVendidos" ADD CONSTRAINT "AsientosVendidos_pasajero_id_fkey" FOREIGN KEY ("pasajero_id") REFERENCES "Pasajeros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsientosVendidos" ADD CONSTRAINT "AsientosVendidos_viaje_id_fkey" FOREIGN KEY ("viaje_id") REFERENCES "Viajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
