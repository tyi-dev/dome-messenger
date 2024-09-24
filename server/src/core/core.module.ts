import { Module } from '@nestjs/common';
import { AuthModule } from '@server/src/core/auth/auth.module';
import { ConfigModule } from '@server/src/core/config/config.module';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { UserModule } from '@server/src/core/user/user.module';
import { ConversationModule } from '@server/src/core/conversation/conversation.module';
import { MessageModule } from '@server/src/core/message/message.module';
import { MessageStatusModule } from '@server/src/core/message-status/message-status.module';

@Module({
   imports: [
      AuthModule,
      UserModule,
      ConfigModule,
      RepositoriesModule,
      ConversationModule,
      MessageModule,
      MessageStatusModule,
   ],
})
export class CoreModule {}
