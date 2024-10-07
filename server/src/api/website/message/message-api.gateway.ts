import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Param, UseGuards } from '@nestjs/common';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { MessageApiService } from '@server/src/api/website/message/message-api.service';
import { Socket } from 'socket.io';

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
   async getMessages(@MessageBody() body: string, @ConnectedSocket() client: Socket) {
      console.log(client);
      this.server.emit('conversation', body);
      return this.messageApiService.getConversationMessages(client.handshake.auth.token, 1);
   }
}
