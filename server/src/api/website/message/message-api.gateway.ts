import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageApiService } from '@server/src/api/website/message/message-api.service';
import { Socket } from 'socket.io';
import { WSNamespace } from '@shared/types/websockets';
import { CreateMessageRequest } from '@server/src/api/website/message/dto/create-message.request';
import { UpdateMessageRequest } from '@server/src/api/website/message/dto/update-message.request';

@WebSocketGateway({
   cors: {
      origin: '*',
   },
})
export class MessageApiGateway {
   constructor(private readonly messageApiService: MessageApiService) {}

   @WebSocketServer()
   server: Server;

   @SubscribeMessage(WSNamespace.CONVERSATION_MESSAGES)
   async getMessages(@MessageBody() payload: { conversationId: number }, @ConnectedSocket() client: Socket) {
      client.join(`conversation-${payload.conversationId}`);
      await this.emitConversationMessages(client.handshake.auth.token, payload.conversationId);
   }

   @SubscribeMessage(WSNamespace.CREATE_MESSAGE)
   async createMessage(@MessageBody() payload: { data: CreateMessageRequest }, @ConnectedSocket() client: Socket) {
      await this.messageApiService.createMessage(client.handshake.auth.token, payload.data);
      await this.emitConversationMessages(client.handshake.auth.token, payload.data.conversationId);
   }

   @SubscribeMessage(WSNamespace.UPDATE_MESSAGE)
   async updateMessage(
      @MessageBody() payload: { data: UpdateMessageRequest; conversationId: number },
      @ConnectedSocket() client: Socket,
   ) {
      await this.messageApiService.updateMessage(client.handshake.auth.token, payload.data);
      await this.emitConversationMessages(client.handshake.auth.token, payload.conversationId);
   }

   @SubscribeMessage(WSNamespace.DELETE_MESSAGE)
   async deleteMessage(
      @MessageBody() payload: { data: { messageId: number }; conversationId: number },
      @ConnectedSocket() client: Socket,
   ) {
      await this.messageApiService.deleteMessage(client.handshake.auth.token, payload.data.messageId);
      await this.emitConversationMessages(client.handshake.auth.token, payload.conversationId);
   }

   private async emitConversationMessages(userToken: string, conversationId: number) {
      const conversationMessages = await this.messageApiService.getConversationMessages(userToken, conversationId);
      this.server.to(`conversation-${conversationId}`).emit(WSNamespace.CONVERSATION_MESSAGES, conversationMessages);
   }
}
