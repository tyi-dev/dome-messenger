import { Injectable } from '@nestjs/common';
import { ConversationParticipantService } from '@server/src/core/conversation-participant/conversation-participant.service';

@Injectable()
export class ConversationParticipantApiService {
   constructor(private readonly conversationParticipantService: ConversationParticipantService) {}

   public async getConversationParticipants(conversationId: number, currentUserId: number) {
      return this.conversationParticipantService.getConversationParticipants(conversationId, currentUserId);
   }

   public async getConversationParticipant(conversationId: number, currentUserId: number) {
      return this.conversationParticipantService.getConversationParticipant(conversationId, currentUserId);
   }
}
