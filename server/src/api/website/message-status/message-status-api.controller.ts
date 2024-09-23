import { Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { MessageStatusApiService } from '@server/src/api/website/message-status/message-status-api.service';
import { UpdateMessageStatusRequest } from '@server/src/api/website/message-status/dto/update-message-status.request';

@WebsiteController('message-status')
export class MessageStatusApiController {
   constructor(private readonly messageStatusApiService: MessageStatusApiService) {}

   @UseGuards(JwtGuarded)
   @Put('update/:statusId')
   async getConversationParticipants(
      @Param('statusId') statusId: number,
      @CurrentUser() user: JwtAuthPayload,
      @Body() data: UpdateMessageStatusRequest,
   ) {
      return this.messageStatusApiService.updateStatus(user.id, statusId, data);
   }
}
