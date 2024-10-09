import { Get, Param, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';
import { ConversationParticipantApiService } from '@server/src/api/website/conversation-participant/conversation-participant-api.service';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';

@WebsiteController('conversation-participant')
export class ConversationParticipantApiController {
   constructor(private readonly conversationParticipantApiService: ConversationParticipantApiService) {}

   @UseGuards(JwtGuarded)
   @Get('get-participants/:conversationId')
   async getConversationParticipants(
      @Param('conversationId') conversationId: number,
      @CurrentUser() currentUser: JwtAuthPayload,
   ) {
      return this.conversationParticipantApiService.getConversationParticipants(conversationId, currentUser.id);
   }
}
