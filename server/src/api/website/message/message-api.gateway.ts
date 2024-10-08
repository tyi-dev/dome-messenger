import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageApiService } from '@server/src/api/website/message/message-api.service';
import { Socket } from 'socket.io';
import { MessageWebsocketPayload } from '@shared/types/message';

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
   async getMessages(@MessageBody() payload: MessageWebsocketPayload, @ConnectedSocket() client: Socket) {
      if (payload?.messageToCreate?.content)
         await this.messageApiService.createMessage(client.handshake.auth.token, {
            content: payload.messageToCreate.content,
            conversationId: payload.conversationId,
         });

      if (payload?.messageToUpdate?.content && payload?.messageToUpdate?.id)
         await this.messageApiService.updateMessage(client.handshake.auth.token, payload.messageToUpdate.id, {
            content: payload.messageToUpdate.content,
         });

      if (payload?.messageToDelete?.id)
         await this.messageApiService.deleteMessage(client.handshake.auth.token, payload.messageToDelete.id);

      const conversationMessages = await this.messageApiService.getConversationMessages(
         client.handshake.auth.token,
         payload.conversationId,
      );
      client.emit('conversation', conversationMessages);
   }
}
