import { Injectable } from '@nestjs/common';
import { ConversationService } from '@server/src/core/conversation/conversation.service';
import { CreateConversationRequest } from '@server/src/api/website/conversation/dto/create-conversation.request';
import { UpdateConversationRequest } from '@server/src/api/website/conversation/dto/update-conversation.request';

@Injectable()
export class ConversationApiService {
   constructor(private readonly conversationService: ConversationService) {}

   public async createConversation(data: CreateConversationRequest) {
      return this.conversationService.createConversation(data);
   }

   public async updateConversation(conversationId: number, data: UpdateConversationRequest) {
      return this.conversationService.updateConversation(conversationId, data);
   }

   public async getUsersConversations(userId: number) {
      return this.conversationService.getAllUsersConversations(userId);
   }
}
