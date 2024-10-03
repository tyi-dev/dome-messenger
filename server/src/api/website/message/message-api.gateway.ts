import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Param, UseGuards } from '@nestjs/common';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { MessageApiService } from '@server/src/api/website/message/message-api.service';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';

@WebSocketGateway({
   cors: {
      origin: '*',
   },
})
export class MessageApiGateway {
   constructor(private readonly messageApiService: MessageApiService) {}

   @WebSocketServer()
   server: Server;

   @SubscribeMessage('conversation')
   getMessages(@MessageBody() body: string) {
      this.server.emit('conversation', body);
      //return this.messageApiService.getConversationMessages(user.id, conversationId);
   }
}
