/*
  Warnings:

  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `item`;

-- CreateTable
CREATE TABLE `MenuItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('FAJITA', 'GRILLED_CHEESE', 'GRILLED_VEGETABLES', 'BURRITO', 'TACO', 'QUESADILLA', 'PALAK_PANEER', 'NACHOS', 'CHIPS_AND_SALSA', 'GUACAMOLE', 'QUESO') NOT NULL,
    `price` DOUBLE NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` ENUM('DRINK', 'APPETIZER', 'ENTREE', 'DESSERT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
