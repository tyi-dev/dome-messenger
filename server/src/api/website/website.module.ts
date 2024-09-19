import { Module } from '@nestjs/common';
import { AuthApiModule } from '@server/src/api/website/auth/auth-api.module';
import { UserApiModule } from '@server/src/api/website/user/user-api.module';
import { ConversationApiModule } from '@server/src/api/website/conversation/conversation-api.module';
import { MessageApiModule } from '@server/src/api/website/message/message-api.module';

@Module({
   imports: [AuthApiModule, UserApiModule, ConversationApiModule, MessageApiModule],
})
export class WebsiteApiModule {}
