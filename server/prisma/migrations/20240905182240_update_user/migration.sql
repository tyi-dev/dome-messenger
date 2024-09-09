/*
  Warnings:

  - You are about to drop the column `last_seen` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_seen",
ADD COLUMN     "lastSeen" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
