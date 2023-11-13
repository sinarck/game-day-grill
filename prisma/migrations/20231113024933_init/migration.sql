/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `menu_item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `menu_item` DROP FOREIGN KEY `menu_item_id_fkey`;

-- AlterTable
ALTER TABLE `menu_item` ADD COLUMN `orderId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `menu_item_name_key` ON `menu_item`(`name`);

-- AddForeignKey
ALTER TABLE `menu_item` ADD CONSTRAINT `menu_item_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
