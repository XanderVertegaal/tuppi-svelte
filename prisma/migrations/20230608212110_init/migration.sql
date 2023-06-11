-- CreateEnum
CREATE TYPE "SignVariantCategory" AS ENUM ('DEFAULT', 'LATE', 'MIDDLE', 'EARLY');

-- CreateEnum
CREATE TYPE "FontSet" AS ENUM ('ULLIKUMMI_A', 'ULLIKUMMI_B', 'ULLIKUMMI_C');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSignProgress" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSignProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "unicode" TEXT NOT NULL,
    "syllValues" TEXT[],

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logograph" (
    "id" SERIAL NOT NULL,
    "logTranslation" TEXT NOT NULL,
    "logTransliteration" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Logograph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Determinative" (
    "id" SERIAL NOT NULL,
    "detTranslation" TEXT NOT NULL,
    "detTransliteration" TEXT NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "Determinative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterVariant" (
    "id" SERIAL NOT NULL,
    "category" "SignVariantCategory" NOT NULL DEFAULT 'DEFAULT',
    "characterId" INTEGER NOT NULL,
    "fontSet" "FontSet" NOT NULL DEFAULT 'ULLIKUMMI_A',
    "vertical" INTEGER NOT NULL DEFAULT 0,
    "horizontal" INTEGER NOT NULL DEFAULT 0,
    "glossenkeil" INTEGER NOT NULL DEFAULT 0,
    "diagonalAsc" INTEGER NOT NULL DEFAULT 0,
    "diagonalDesc" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CharacterVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSignProgress_userId_characterId_key" ON "UserSignProgress"("userId", "characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Character_unicode_key" ON "Character"("unicode");

-- AddForeignKey
ALTER TABLE "UserSignProgress" ADD CONSTRAINT "UserSignProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSignProgress" ADD CONSTRAINT "UserSignProgress_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logograph" ADD CONSTRAINT "Logograph_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Determinative" ADD CONSTRAINT "Determinative_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterVariant" ADD CONSTRAINT "CharacterVariant_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
