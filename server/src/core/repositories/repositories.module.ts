import { Module } from '@nestjs/common';
import { UserRepository } from '@server/src/core/repositories/user.repository';
import { PrismaModule } from '@server/src/providers/prisma/prisma.module';
import { ConversationRepository } from '@server/src/core/repositories/conversation.repository';

@Module({
   providers: [UserRepository, ConversationRepository],
   exports: [UserRepository, ConversationRepository],
   imports: [PrismaModule],
})
export class RepositoriesModule {}
