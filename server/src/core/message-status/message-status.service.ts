import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageStatusRepository } from '@server/src/core/repositories/message-status.repository';
import { UpdateMessageStatusRequest } from '@server/src/api/website/message-status/dto/update-message-status.request';
import { compareAsc } from 'date-fns';

@Injectable()
export class MessageStatusService {
   constructor(private readonly messageStatusRepository: MessageStatusRepository) {}

   public async updateStatus(userId: number, statusId: number, data: UpdateMessageStatusRequest) {
      const status = await this.messageStatusRepository.getById(statusId);
      if (status.readAt !== null && compareAsc(status.readAt, data.readAt) === -1)
         throw new NotFoundException(`Rejected`);
      if (!status) throw new NotFoundException(`Status does not exist`);
      if (status.userId !== userId) throw new NotFoundException(`Can not update status of a message that isn\`t yours`);

      return this.messageStatusRepository.update(statusId, data);
   }

   public async updateAllStatuses(userId: number, conversationId: number, data: UpdateMessageStatusRequest) {
      const statusesToUpdate = await this.messageStatusRepository.getAllUnread(userId, conversationId);
      const updatedStatuses = statusesToUpdate.map((status) => {
         return this.updateStatus(userId, status.id, data);
      });
      return await Promise.allSettled(updatedStatuses);
   }
}
