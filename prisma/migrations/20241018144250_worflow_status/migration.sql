-- CreateEnum
CREATE TYPE "WorkflowStatus" AS ENUM ('active', 'inactive', 'draft');

-- AlterTable
ALTER TABLE "Workflow" ADD COLUMN     "status" "WorkflowStatus" NOT NULL DEFAULT 'draft';
