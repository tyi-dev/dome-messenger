import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageApiService } from '@server/src/api/website/message/message-api.service';
import { Socket } from 'socket.io';
import { WSNamespace } from '@shared/types/websockets';
import { CreateMessageRequest } from '@server/src/api/website/message/dto/create-message.request';
import { UpdateMessageRequest } from '@server/src/api/website/message/dto/update-message.request';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';

@WebSocketGateway({
   cors: {
      origin: '*',
   },
})
export class MessageApiGateway {
   constructor(
      private readonly messageApiService: MessageApiService,
      private readonly jwtService: JwtService,
   ) {}

   @WebSocketServer()
   server: Server;

   @SubscribeMessage(WSNamespace.CONVERSATION_MESSAGES)
   async getMessages(@MessageBody() payload: { conversationId: number }, @ConnectedSocket() client: Socket) {
      const { id: currentUserId } = await this.getUserByToken(client.handshake.auth.token);
      client.join(`conversation-${payload.conversationId}`);
      await this.emitConversationMessages(currentUserId, payload.conversationId);
   }

   @SubscribeMessage(WSNamespace.CREATE_MESSAGE)
   async createMessage(@MessageBody() payload: { data: CreateMessageRequest }, @ConnectedSocket() client: Socket) {
      const { id: currentUserId } = await this.getUserByToken(client.handshake.auth.token);
      await this.messageApiService.createMessage(currentUserId, payload.data);
      await this.emitConversationMessages(currentUserId, payload.data.conversationId);
   }

   @SubscribeMessage(WSNamespace.UPDATE_MESSAGE)
   async updateMessage(@MessageBody() payload: { data: UpdateMessageRequest }, @ConnectedSocket() client: Socket) {
      const { id: currentUserId } = await this.getUserByToken(client.handshake.auth.token);
      await this.messageApiService.updateMessage(currentUserId, payload.data);
      await this.emitConversationMessages(currentUserId, payload.data.conversationId);
   }

   @SubscribeMessage(WSNamespace.DELETE_MESSAGE)
   async deleteMessage(
      @MessageBody() payload: { data: { messageId: number }; conversationId: number },
      @ConnectedSocket() client: Socket,
   ) {
      const { id: currentUserId } = await this.getUserByToken(client.handshake.auth.token);
      await this.messageApiService.deleteMessage(currentUserId, payload.data.messageId);
      await this.emitConversationMessages(currentUserId, payload.conversationId);
   }

   private async getUserByToken(token: string) {
      return this.jwtService.verifyAsync<JwtAuthPayload>(token);
   }

   public async emitConversationMessages(userId: number, conversationId: number) {
      const conversationMessages = await this.messageApiService.getConversationMessages(userId, conversationId);
      this.server.to(`conversation-${conversationId}`).emit(WSNamespace.CONVERSATION_MESSAGES, conversationMessages);
   }
}
