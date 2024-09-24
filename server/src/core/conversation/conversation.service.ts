import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRepository } from '@server/src/core/repositories/conversation.repository';
import { CreateConversationRequest } from '@server/src/api/website/conversation/dto/create-conversation.request';
import { ConversationParticipantRepository } from '@server/src/core/repositories/conversation-participant.repository';
import { UpdateConversationRequest } from '@server/src/api/website/conversation/dto/update-conversation.request';

@Injectable()
export class ConversationService {
   constructor(
      private readonly conversationRepository: ConversationRepository,
      private readonly conversationParticipantsRepository: ConversationParticipantRepository,
   ) {}

   public async createConversation(data: CreateConversationRequest) {
      const conversation = await this.conversationRepository.create({ title: data.title });
      data.participants.map(async (item) => {
         await this.conversationParticipantsRepository.create({ userId: item.id, conversationId: conversation.id });
      });
      return conversation;
   }

   public async updateConversation(conversationId: number, data: UpdateConversationRequest) {
      const conversation = await this.checkIfConversationExists(conversationId);
      if (!conversation) return null;

      return this.conversationRepository.update(conversationId, data);
   }

   public async getAllUsersConversations(userId: number) {
      return this.conversationRepository.getByUserId(userId);
   }

   private async checkIfConversationExists(conversationId: number) {
      const conversation = await this.conversationRepository.getByUserId(conversationId);
      if (!conversation) throw new NotFoundException('Conversation does not exist');
      return conversation;
   }
}