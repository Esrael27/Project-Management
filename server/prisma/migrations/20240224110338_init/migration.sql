/*
  Warnings:

  - You are about to drop the column `taskId` on the `Issue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_taskId_fkey`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `taskId`;
