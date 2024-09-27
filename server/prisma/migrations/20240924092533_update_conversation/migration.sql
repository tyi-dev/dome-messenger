/*
  Warnings:

  - You are about to drop the column `is_group` on the `Conversation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('P2P', 'GROUP', 'CHANNEL');

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "is_group",
ADD COLUMN     "conversation_type" "ConversationType" NOT NULL DEFAULT 'P2P';
