/*
  Warnings:

  - Changed the column `options` on the `menu_item` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterTable
ALTER TABLE "menu_item" ALTER COLUMN "options" SET DATA TYPE "Options"[];
