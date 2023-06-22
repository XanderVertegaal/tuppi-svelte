/*
  Warnings:

  - You are about to drop the column `detProgress` on the `UserSignProgress` table. All the data in the column will be lost.
  - You are about to drop the column `logProgress` on the `UserSignProgress` table. All the data in the column will be lost.
  - You are about to drop the column `syllProgress` on the `UserSignProgress` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Sign" AS ENUM ('SYLLABOGRAM', 'LOGOGRAM', 'DETERMINATIVE');

-- CreateEnum
CREATE TYPE "Mastery" AS ENUM ('LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4', 'LEVEL_5', 'LEVEL_6', 'LEVEL_7', 'LEVEL_8');

-- AlterTable
ALTER TABLE "UserSignProgress" DROP COLUMN "detProgress",
DROP COLUMN "logProgress",
DROP COLUMN "syllProgress";

-- CreateTable
CREATE TABLE "SignProgress" (
    "id" SERIAL NOT NULL,
    "sign" "Sign" NOT NULL,
    "mastery" "Mastery" NOT NULL DEFAULT 'LEVEL_1',
    "nextReview" TIMESTAMP(3) NOT NULL,
    "seen" INTEGER NOT NULL DEFAULT 0,
    "userSignProgressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SignProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SignProgress" ADD CONSTRAINT "SignProgress_userSignProgressId_fkey" FOREIGN KEY ("userSignProgressId") REFERENCES "UserSignProgress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
