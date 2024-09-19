import { Module } from '@nestjs/common';
import { ConversationApiController } from '@server/src/api/website/conversation/conversation-api.controller';
import { ConversationApiService } from '@server/src/api/website/conversation/conversation-api.service';
import { ConversationModule } from '@server/src/core/conversation/conversation.module';

@Module({
   controllers: [ConversationApiController],
   providers: [ConversationApiService],
   imports: [ConversationModule],
})
export class ConversationApiModule {}
