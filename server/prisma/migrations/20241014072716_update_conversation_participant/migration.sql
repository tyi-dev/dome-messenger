-- CreateEnum
CREATE TYPE "ParticipantRole" AS ENUM ('MEMBER', 'ADMIN');

-- AlterTable
ALTER TABLE "ConversationParticipant" ADD COLUMN     "role" "ParticipantRole" NOT NULL DEFAULT 'MEMBER';
