import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { ConversationService } from '@server/src/core/conversation/conversation.service';

@Module({
   providers: [ConversationService],
   exports: [ConversationService],
   imports: [RepositoriesModule],
})
export class ConversationModule {}
