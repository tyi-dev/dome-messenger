import { Body, Param, Post, Put, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';
import { CreateMessageRequest } from '@server/src/api/website/message/dto/create-message.request';
import { UpdateMessageRequest } from '@server/src/api/website/message/dto/update-message.request';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { MessageApiService } from '@server/src/api/website/message/message-api.service';

@WebsiteController('message')
export class MessageApiController {
   constructor(private readonly messageApiService: MessageApiService) {}

   @UseGuards(JwtGuarded)
   @Post('create')
   async create(@CurrentUser() user: JwtAuthPayload, @Body() data: CreateMessageRequest) {
      return this.messageApiService.createMessage(user.id, data);
   }

   @UseGuards(JwtGuarded)
   @Put('update/:id')
   async update(@Param('id') id: number, @Body() data: UpdateMessageRequest) {
      return this.messageApiService.updateMessage(id, data);
   }
}
