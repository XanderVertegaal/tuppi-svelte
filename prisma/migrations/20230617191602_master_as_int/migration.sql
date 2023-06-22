/*
  Warnings:

  - The `mastery` column on the `SignProgress` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SignProgress" DROP COLUMN "mastery",
ADD COLUMN     "mastery" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "Mastery";
