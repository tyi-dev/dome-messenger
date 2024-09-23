/*
  Warnings:

  - You are about to drop the column `is_read` on the `MessageStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MessageStatus" DROP COLUMN "is_read";
