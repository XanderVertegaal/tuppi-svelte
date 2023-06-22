/*
  Warnings:

  - A unique constraint covering the columns `[userSignProgressId,sign]` on the table `SignProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SignProgress_userSignProgressId_sign_key" ON "SignProgress"("userSignProgressId", "sign");
