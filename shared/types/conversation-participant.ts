import { User } from '@shared/types/user';

export type ConversationParticipant = {
   id: number;
   userId: number;
   conversationId: number;
   joinedAt: string;
   user: User;
};
