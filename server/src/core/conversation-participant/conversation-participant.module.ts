import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { ConversationParticipantService } from '@server/src/core/conversation-participant/conversation-participant.service';

@Module({
   providers: [ConversationParticipantService],
   exports: [ConversationParticipantService],
   imports: [RepositoriesModule],
})
export class ConversationParticipantModule {}
