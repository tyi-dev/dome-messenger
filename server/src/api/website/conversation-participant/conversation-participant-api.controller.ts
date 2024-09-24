import { Get, Param, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';
import { ConversationParticipantApiService } from '@server/src/api/website/conversation-participant/conversation-participant-api.service';

@WebsiteController('conversation-participant')
export class ConversationParticipantApiController {
   constructor(private readonly conversationParticipantApiService: ConversationParticipantApiService) {}

   @UseGuards(JwtGuarded)
   @Get('get-participants/:conversationId')
   async getConversationParticipants(@Param('conversationId') conversationId: number) {
      return this.conversationParticipantApiService.getConversationParticipants(conversationId);
   }
}
