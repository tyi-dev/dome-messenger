import { Module } from '@nestjs/common';
import { MessageStatusApiController } from '@server/src/api/website/message-status/message-status-api.controller';
import { MessageStatusApiService } from '@server/src/api/website/message-status/message-status-api.service';
import { MessageStatusModule } from '@server/src/core/message-status/message-status.module';
import { MessageApiModule } from '@server/src/api/website/message/message-api.module';

@Module({
   controllers: [MessageStatusApiController],
   providers: [MessageStatusApiService],
   imports: [MessageStatusModule, MessageApiModule],
})
export class MessageStatusApiModule {}
