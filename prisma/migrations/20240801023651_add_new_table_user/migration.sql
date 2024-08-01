/*
  Warnings:

  - Added the required column `userId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Track` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `noTelp` VARCHAR(191) NULL,
    `password` VARCHAR(350) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Track` ADD CONSTRAINT `Track_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
