/*
  Warnings:

  - You are about to drop the column `GoogleAcessToken` on the `AccessToken` table. All the data in the column will be lost.
  - Added the required column `GoogleAccessTokenExpireAt` to the `AccessToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessToken" DROP COLUMN "GoogleAcessToken",
ADD COLUMN     "GoogleAccessToken" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "GoogleAccessTokenExpireAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "GoogleRefreshToken" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "GithubAccessToken" SET DEFAULT '';
