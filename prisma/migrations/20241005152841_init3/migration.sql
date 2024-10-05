/*
  Warnings:

  - The values [Discord,Notion] on the enum `NodeType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `DiscordAccessToken` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `NotionAccessToken` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `SlackAccessToken` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `AccessToken` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NodeType_new" AS ENUM ('Google', 'Github');
ALTER TABLE "Node" ALTER COLUMN "type" TYPE "NodeType_new" USING ("type"::text::"NodeType_new");
ALTER TYPE "NodeType" RENAME TO "NodeType_old";
ALTER TYPE "NodeType_new" RENAME TO "NodeType";
DROP TYPE "NodeType_old";
COMMIT;

-- DropIndex
DROP INDEX "AccessToken_DiscordAccessToken_key";

-- DropIndex
DROP INDEX "AccessToken_GithubAccessToken_key";

-- DropIndex
DROP INDEX "AccessToken_GoogleAcessToken_key";

-- DropIndex
DROP INDEX "AccessToken_NotionAccessToken_key";

-- DropIndex
DROP INDEX "AccessToken_SlackAccessToken_key";

-- AlterTable
ALTER TABLE "AccessToken" DROP COLUMN "DiscordAccessToken",
DROP COLUMN "NotionAccessToken",
DROP COLUMN "SlackAccessToken",
DROP COLUMN "token";
