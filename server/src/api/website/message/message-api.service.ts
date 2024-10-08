import { Injectable } from '@nestjs/common';
import { MessageService } from '@server/src/core/message/message.service';
import { CreateMessageRequest } from '@server/src/api/website/message/dto/create-message.request';
import { UpdateMessageRequest } from '@server/src/api/website/message/dto/update-message.request';

@Injectable()
export class MessageApiService {
   constructor(private readonly messageService: MessageService) {}

   public async createMessage(senderToken: string, data: CreateMessageRequest) {
      return this.messageService.createMessage(senderToken, data);
   }

   public async updateMessage(senderToken: string, messageId: number, data: UpdateMessageRequest) {
      return this.messageService.updateMessage(senderToken, messageId, data);
   }

   public async deleteMessage(senderToken: string, messageId: number) {
      return this.messageService.deleteMessage(senderToken, messageId);
   }

   public async getConversationMessages(userToken: string, conversationId: number) {
      return this.messageService.getConversationMessages(userToken, conversationId);
   }
}
