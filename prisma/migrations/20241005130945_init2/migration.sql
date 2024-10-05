/*
  Warnings:

  - The values [GoogleDrive,GoogleMail,Slack] on the enum `NodeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `GoogleDriveAccessToken` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `GoogleMailAccessToken` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `GoogleId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NodeType_new" AS ENUM ('Google', 'Github', 'Discord', 'Notion');
ALTER TABLE "Node" ALTER COLUMN "type" TYPE "NodeType_new" USING ("type"::text::"NodeType_new");
ALTER TYPE "NodeType" RENAME TO "NodeType_old";
ALTER TYPE "NodeType_new" RENAME TO "NodeType";
DROP TYPE "NodeType_old";
COMMIT;

-- DropIndex
DROP INDEX "AccessToken_GoogleDriveAccessToken_key";

-- DropIndex
DROP INDEX "AccessToken_GoogleMailAccessToken_key";

-- AlterTable
ALTER TABLE "AccessToken" DROP COLUMN "GoogleDriveAccessToken",
DROP COLUMN "GoogleMailAccessToken";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "GoogleId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
