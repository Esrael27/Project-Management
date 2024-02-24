/*
  Warnings:

  - You are about to alter the column `status` on the `Issue` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `Issue` MODIFY `status` ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED') NOT NULL DEFAULT 'OPEN';
