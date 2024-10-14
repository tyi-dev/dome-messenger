import { Injectable } from '@nestjs/common';
import { ConversationParticipantRepository } from '@server/src/core/repositories/conversation-participant.repository';

@Injectable()
export class ConversationParticipantService {
   constructor(private readonly conversationParticipantsRepository: ConversationParticipantRepository) {}

   public async getConversationParticipants(conversationId: number, currentUserId: number) {
      return this.conversationParticipantsRepository.getConversationParticipants(conversationId, currentUserId);
   }

   public async getConversationParticipant(conversationId: number, currentUserId: number) {
      return this.conversationParticipantsRepository.getConversationParticipant(conversationId, currentUserId);
   }
}
