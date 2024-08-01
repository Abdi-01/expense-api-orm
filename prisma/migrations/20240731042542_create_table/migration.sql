-- CreateTable
CREATE TABLE `Track` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    `nominal` INTEGER NOT NULL,
    `date` DATETIME(0) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Track` ADD CONSTRAINT `Track_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
