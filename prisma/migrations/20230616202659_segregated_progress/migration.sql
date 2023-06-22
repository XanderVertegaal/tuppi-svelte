/*
  Warnings:

  - You are about to drop the column `progress` on the `UserSignProgress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSignProgress" DROP COLUMN "progress",
ADD COLUMN     "detProgress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "logProgress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "syllProgress" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
