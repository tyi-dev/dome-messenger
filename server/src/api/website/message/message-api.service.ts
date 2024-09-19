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

   public async updateMessage(messageId: number, data: UpdateMessageRequest) {
      return this.messageService.updateMessage(messageId, data);
   }
}
