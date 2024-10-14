import { User } from '@shared/types/user';

export type ConversationParticipant = {
   id: number;
   userId: number;
   conversationId: number;
   joinedAt: string;
   role: ConversationParticipantRole;

   user: User;
};

export enum ConversationParticipantRole {
   MEMBER = 'MEMBER',
   ADMIN = 'ADMIN',
   OWNER = 'OWNER',
}
