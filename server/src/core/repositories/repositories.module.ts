import { Module } from '@nestjs/common';
import { UserRepository } from '@server/src/core/repositories/user.repository';
import { PrismaModule } from '@server/src/providers/prisma/prisma.module';
import { ConversationRepository } from '@server/src/core/repositories/conversation.repository';
import { MessageRepository } from '@server/src/core/repositories/message.repository';
import { ConversationParticipantRepository } from '@server/src/core/repositories/conversation-participant.repository';
import { MessageStatusRepository } from '@server/src/core/repositories/message-status.repository';

@Module({
   providers: [
      UserRepository,
      ConversationRepository,
      MessageRepository,
      ConversationParticipantRepository,
      MessageStatusRepository,
   ],
   exports: [
      UserRepository,
      ConversationRepository,
      MessageRepository,
      ConversationParticipantRepository,
      MessageStatusRepository,
   ],
   imports: [PrismaModule],
})
export class RepositoriesModule {}
