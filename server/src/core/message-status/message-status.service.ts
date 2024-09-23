import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageStatusRepository } from '@server/src/core/repositories/message-status.repository';
import { UpdateMessageStatusRequest } from '@server/src/api/website/message-status/dto/update-message-status.request';

@Injectable()
export class MessageStatusService {
   constructor(private readonly messageStatusRepository: MessageStatusRepository) {}

   public async updateStatus(userId: number, statusId: number, data: UpdateMessageStatusRequest) {
      const status = await this.messageStatusRepository.getById(statusId);
      if (status.userId !== userId) throw new NotFoundException(`Can not update status of a message that isn\`t yours`);

      return this.messageStatusRepository.update(statusId, data);
   }
}
