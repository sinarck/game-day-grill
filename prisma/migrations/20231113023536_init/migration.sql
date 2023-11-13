/*
  Warnings:

  - You are about to drop the `menuitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `menuitem`;

-- CreateTable
CREATE TABLE `menu_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('FAJITA', 'GRILLED_CHEESE', 'GRILLED_VEGETABLES', 'BURRITO', 'TACO', 'QUESADILLA', 'PALAK_PANEER', 'NACHOS', 'CHIPS_AND_SALSA', 'GUACAMOLE', 'QUESO') NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` ENUM('DRINK', 'APPETIZER', 'ENTREE', 'DESSERT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total_price` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menu_item` ADD CONSTRAINT `menu_item_id_fkey` FOREIGN KEY (`id`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
