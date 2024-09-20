import { Body, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { ConversationApiService } from '@server/src/api/website/conversation/conversation-api.service';
import { CreateConversationRequest } from '@server/src/api/website/conversation/dto/create-conversation.request';
import { UpdateConversationRequest } from '@server/src/api/website/conversation/dto/update-conversation.request';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';

@WebsiteController('conversation')
export class ConversationApiController {
   constructor(private readonly conversationApiService: ConversationApiService) {}

   @UseGuards(JwtGuarded)
   @Post('create')
   async create(@Body() data: CreateConversationRequest) {
      return this.conversationApiService.createConversation(data);
   }

   @UseGuards(JwtGuarded)
   @Put('update/:id')
   async update(@Param('id') id: number, @Body() data: UpdateConversationRequest) {
      return this.conversationApiService.updateConversation(id, data);
   }

   @UseGuards(JwtGuarded)
   @Get('my-conversations')
   async getConversations(@CurrentUser() user: JwtAuthPayload) {
      return this.conversationApiService.getUsersConversations(user.id);
   }
}
