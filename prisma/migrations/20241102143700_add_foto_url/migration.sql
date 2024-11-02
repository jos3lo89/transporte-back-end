-- AlterTable
ALTER TABLE "Conductores" ADD COLUMN     "foto_id" TEXT;

-- AlterTable
ALTER TABLE "Empleados" ADD COLUMN     "foto_id" TEXT;

-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "logo_id" TEXT,
ALTER COLUMN "logo_url" DROP NOT NULL;
