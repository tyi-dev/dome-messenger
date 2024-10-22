import { Injectable } from '@nestjs/common';
import { MessageStatusService } from '@server/src/core/message-status/message-status.service';
import { UpdateMessageStatusRequest } from '@server/src/api/website/message-status/dto/update-message-status.request';

@Injectable()
export class MessageStatusApiService {
   constructor(private readonly messageStatusService: MessageStatusService) {}

   public async updateStatus(userId: number, statusId: number, data: UpdateMessageStatusRequest) {
      return this.messageStatusService.updateStatus(userId, statusId, data);
   }

   public async updateAllStatuses(userId: number, conversationId: number, data: UpdateMessageStatusRequest) {
      return this.messageStatusService.updateAllStatuses(userId, conversationId, data);
   }
}
