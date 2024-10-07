import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageRepository } from '@server/src/core/repositories/message.repository';
import { MessageStatusRepository } from '@server/src/core/repositories/message-status.repository';
import { CreateMessageRequest } from '@server/src/api/website/message/dto/create-message.request';
import { UpdateMessageRequest } from '@server/src/api/website/message/dto/update-message.request';
import { ConversationParticipantRepository } from '@server/src/core/repositories/conversation-participant.repository';
import { ConversationRepository } from '@server/src/core/repositories/conversation.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';

@Injectable()
export class MessageService {
   constructor(
      private readonly messageRepository: MessageRepository,
      private readonly conversationParticipantsRepository: ConversationParticipantRepository,
      private readonly conversationRepository: ConversationRepository,
      private readonly messageStatusRepository: MessageStatusRepository,
      private readonly jwtService: JwtService,
   ) {}

   public async createMessage(senderId: number, data: CreateMessageRequest) {
      const userInConversation = await this.verifyIfUserIsInConversation(senderId, data.conversationId);
      if (!userInConversation) return null;

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

   public async updateMessage(senderId: number, messageId: number, data: UpdateMessageRequest) {
      const currentMessage = await this.verifyMessage(messageId);
      if (!currentMessage) return null;

      const userInConversation = await this.verifyIfUserIsInConversation(senderId, currentMessage.conversationId);
      if (!userInConversation) return null;

      return this.messageRepository.update(messageId, data);
   }

   public async deleteMessage(senderId: number, messageId: number) {
      const currentMessage = await this.verifyMessage(messageId);
      if (!currentMessage) return null;

      const userInConversation = await this.verifyIfUserIsInConversation(senderId, currentMessage.conversationId);
      if (!userInConversation) return null;

      return this.messageRepository.delete(messageId);
   }

   public async getConversationMessages(userToken: string, conversationId: number) {
      const { id: userId } = await this.jwtService.verifyAsync<JwtAuthPayload>(userToken);

      const userInConversation = await this.verifyIfUserIsInConversation(userId, conversationId);
      if (!userInConversation) return null;

      return this.messageRepository.getConversationMessages(conversationId);
   }

   private async verifyIfUserIsInConversation(userId: number, conversationId: number) {
      const currentConversation = await this.conversationRepository.getById(conversationId);
      if (!currentConversation) throw new NotFoundException('Conversation does not exist');

      const userInConversation = await this.conversationParticipantsRepository.checkIfUserIsAPartOfConversation(
         userId,
         conversationId,
      );
      if (!userInConversation) throw new NotFoundException('You are not a part of this conversation');

      return userInConversation;
   }

   private async verifyMessage(messageId: number) {
      const message = await this.messageRepository.getById(messageId);
      if (!message) throw new NotFoundException('Message does not exist');

      return message;
   }
}
