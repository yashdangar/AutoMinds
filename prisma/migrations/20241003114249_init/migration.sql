-- CreateEnum
CREATE TYPE "NodeType" AS ENUM ('GoogleDrive', 'GoogleMail', 'Github', 'Discord', 'Notion', 'Slack');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "GoogleId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "GoogleAcessToken" TEXT NOT NULL,
    "GoogleDriveAccessToken" TEXT NOT NULL,
    "GoogleMailAccessToken" TEXT NOT NULL,
    "GithubAccessToken" TEXT NOT NULL,
    "NotionAccessToken" TEXT NOT NULL,
    "SlackAccessToken" TEXT NOT NULL,
    "DiscordAccessToken" TEXT NOT NULL,

    CONSTRAINT "AccessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "NodeType" NOT NULL,
    "workflowId" TEXT NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_userId_key" ON "AccessToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_GoogleAcessToken_key" ON "AccessToken"("GoogleAcessToken");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_GoogleDriveAccessToken_key" ON "AccessToken"("GoogleDriveAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_GoogleMailAccessToken_key" ON "AccessToken"("GoogleMailAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_GithubAccessToken_key" ON "AccessToken"("GithubAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_NotionAccessToken_key" ON "AccessToken"("NotionAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_SlackAccessToken_key" ON "AccessToken"("SlackAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "AccessToken_DiscordAccessToken_key" ON "AccessToken"("DiscordAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_name_userId_key" ON "Workflow"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Node_name_workflowId_key" ON "Node"("name", "workflowId");

-- AddForeignKey
ALTER TABLE "AccessToken" ADD CONSTRAINT "AccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
