-- DropForeignKey
ALTER TABLE "Credenciales" DROP CONSTRAINT "Credenciales_empleado_id_fkey";

-- AddForeignKey
ALTER TABLE "Credenciales" ADD CONSTRAINT "Credenciales_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "Empleados"("id") ON DELETE CASCADE ON UPDATE CASCADE;
