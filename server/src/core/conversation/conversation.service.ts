import { Injectable, NotFoundException } from '@nestjs/common';
import { ConversationRepository } from '@server/src/core/repositories/conversation.repository';
import { CreateConversationRequest } from '@server/src/api/website/conversation/dto/create-conversation.request';
import { ConversationParticipantRepository } from '@server/src/core/repositories/conversation-participant.repository';
import { UpdateConversationRequest } from '@server/src/api/website/conversation/dto/update-conversation.request';
import { ConversationType } from '@shared/types/conversation';
import { ParticipantRole } from '@prisma/client';
import { User } from '@shared/types/user';

@Injectable()
export class ConversationService {
   constructor(
      private readonly conversationRepository: ConversationRepository,
      private readonly conversationParticipantsRepository: ConversationParticipantRepository,
   ) {}

   public async createConversation(userCreatedById: number, data: CreateConversationRequest) {
      const { participants, ...createPayload } = data;

      if (!participants.length) throw new NotFoundException('Cannot create conversation with 0 participants');
      if (createPayload.conversationType === ConversationType.P2P && participants.length > 2)
         throw new NotFoundException('P2P chat cant contain more than 2 people');

      const uniqueParticipants = this.removeParticipantsDuplicates(participants);
      const conversation = await this.conversationRepository.create(createPayload);
      uniqueParticipants.map(async (item) => {
         await this.conversationParticipantsRepository.create({
            userId: item.id,
            conversationId: conversation.id,
            role:
               createPayload.conversationType !== ConversationType.P2P && item.id === userCreatedById
                  ? ParticipantRole.OWNER
                  : ParticipantRole.MEMBER,
         });
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

   private removeParticipantsDuplicates(items: User[]): User[] {
      const uniqueItemsMap = new Map<number, User>();

      for (const item of items) {
         if (!uniqueItemsMap.has(item.id)) {
            uniqueItemsMap.set(item.id, item);
         }
      }

      return Array.from(uniqueItemsMap.values());
   }
}
