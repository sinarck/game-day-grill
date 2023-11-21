-- CreateEnum
CREATE TYPE "food_category" AS ENUM ('DRINK', 'APPETIZER', 'ENTREE', 'DESSERT');

-- CreateEnum
CREATE TYPE "items" AS ENUM ('FAJITA', 'GRILLED_CHEESE', 'GRILLED_VEGETABLES', 'BURRITO', 'TACO', 'QUESADILLA', 'PALAK_PANEER', 'NACHOS', 'CHIPS_AND_SALSA', 'GUACAMOLE', 'QUESO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item" (
    "id" SERIAL NOT NULL,
    "name" "items" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "category" "food_category" NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "menu_item_name_key" ON "menu_item"("name");

-- AddForeignKey
ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
