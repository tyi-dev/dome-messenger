import { Injectable } from '@nestjs/common';
import { MessageService } from '@server/src/core/message/message.service';
import { CreateMessageRequest } from '@server/src/api/website/message/dto/create-message.request';
import { UpdateMessageRequest } from '@server/src/api/website/message/dto/update-message.request';

@Injectable()
export class MessageApiService {
   constructor(private readonly messageService: MessageService) {}

   public async createMessage(senderId: number, data: CreateMessageRequest) {
      return this.messageService.createMessage(senderId, data);
   }

   public async updateMessage(senderId: number, messageId: number, data: UpdateMessageRequest) {
      return this.messageService.updateMessage(senderId, messageId, data);
   }

   public async deleteMessage(senderId: number, messageId: number) {
      return this.messageService.deleteMessage(senderId, messageId);
   }

   public async getConversationMessages(userId: number, conversationId: number) {
      return this.messageService.getConversationMessages(userId, conversationId);
   }
}
