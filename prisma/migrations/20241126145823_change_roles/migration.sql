/*
  Warnings:

  - The values [VENDEDOR,ADMINISTRADOR] on the enum `RolEmpleados` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RolEmpleados_new" AS ENUM ('GERENTE', 'BOLETERO', 'ENCOMENDERO');
ALTER TABLE "Empleados" ALTER COLUMN "rol" TYPE "RolEmpleados_new" USING ("rol"::text::"RolEmpleados_new");
ALTER TYPE "RolEmpleados" RENAME TO "RolEmpleados_old";
ALTER TYPE "RolEmpleados_new" RENAME TO "RolEmpleados";
DROP TYPE "RolEmpleados_old";
COMMIT;
