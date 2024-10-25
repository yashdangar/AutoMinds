/*
  Warnings:

  - Added the required column `workerType` to the `Node` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkerType" AS ENUM ('Trigger', 'Action');

-- AlterTable
ALTER TABLE "Node" ADD COLUMN     "workerType" "WorkerType" NOT NULL;
