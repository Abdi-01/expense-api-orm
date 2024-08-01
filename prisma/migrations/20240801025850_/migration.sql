/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[noTelp]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `email` ON `User`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `noTelp` ON `User`(`noTelp`);
