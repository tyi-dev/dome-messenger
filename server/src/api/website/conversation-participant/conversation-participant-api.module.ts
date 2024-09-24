import { Module } from '@nestjs/common';
import { ConversationParticipantApiController } from '@server/src/api/website/conversation-participant/conversation-participant-api.controller';
import { ConversationParticipantApiService } from '@server/src/api/website/conversation-participant/conversation-participant-api.service';
import { ConversationParticipantModule } from '@server/src/core/conversation-participant/conversation-participant.module';

@Module({
   controllers: [ConversationParticipantApiController],
   providers: [ConversationParticipantApiService],
   imports: [ConversationParticipantModule],
})
export class ConversationParticipantApiModule {}
