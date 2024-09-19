import { Injectable } from '@nestjs/common';
import { MessageRepository } from '@server/src/core/repositories/message.repository';
import { MessageStatusRepository } from '@server/src/core/repositories/message-status.repository';
import { CreateMessageRequest } from '@server/src/api/website/message/dto/create-message.request';
import { UpdateMessageRequest } from '@server/src/api/website/message/dto/update-message.request';
import { ConversationParticipantRepository } from '@server/src/core/repositories/conversation-participant.repository';

@Injectable()
export class MessageService {
   constructor(
      private readonly messageRepository: MessageRepository,
      private readonly conversationParticipantsRepository: ConversationParticipantRepository,
      private readonly messageStatusRepository: MessageStatusRepository,
   ) {}

   public async createMessage(senderId: number, data: CreateMessageRequest) {
      const message = await this.messageRepository.create({ senderId: senderId, ...data });
      const participants = await this.conversationParticipantsRepository.getConversationParticipants(
         data.conversationId,
      );
      participants.map(async (item) => {
         await this.messageStatusRepository.create({
            userId: item.userId,
            messageId: message.id,
         });
      });
      return message;
   }

   public async updateMessage(messageId: number, data: UpdateMessageRequest) {
      return this.messageRepository.update(messageId, data);
   }
}
