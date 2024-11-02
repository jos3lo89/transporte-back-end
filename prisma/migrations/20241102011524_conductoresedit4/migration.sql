/*
  Warnings:

  - The values [FEMENIN0] on the enum `Generos` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Generos_new" AS ENUM ('MASCULINO', 'FEMENINO');
ALTER TABLE "Empleados" ALTER COLUMN "genero" TYPE "Generos_new" USING ("genero"::text::"Generos_new");
ALTER TABLE "Conductores" ALTER COLUMN "genero" TYPE "Generos_new" USING ("genero"::text::"Generos_new");
ALTER TYPE "Generos" RENAME TO "Generos_old";
ALTER TYPE "Generos_new" RENAME TO "Generos";
DROP TYPE "Generos_old";
COMMIT;
