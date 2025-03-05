/*
  Warnings:

  - You are about to alter the column `amount` on the `payment_details` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,6)`.
  - You are about to alter the column `total_amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,6)`.
  - You are about to alter the column `price` on the `plans` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,6)`.
  - You are about to alter the column `price` on the `services` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,6)`.
  - You are about to alter the column `balance` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,6)`.

*/
-- AlterTable
ALTER TABLE `payment_details` MODIFY `amount` DECIMAL(10, 6) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `payments` MODIFY `total_amount` DECIMAL(10, 6) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `plans` MODIFY `price` DECIMAL(10, 6) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `services` MODIFY `price` DECIMAL(10, 6) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE `users` MODIFY `balance` DECIMAL(10, 6) NOT NULL DEFAULT 0.00;
