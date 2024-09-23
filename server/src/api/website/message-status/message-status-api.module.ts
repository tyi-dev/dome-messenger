import { Module } from '@nestjs/common';
import { MessageStatusApiController } from '@server/src/api/website/message-status/message-status-api.controller';
import { MessageStatusApiService } from '@server/src/api/website/message-status/message-status-api.service';
import { MessageStatusModule } from '@server/src/core/message-status/message-status.module';

@Module({
   controllers: [MessageStatusApiController],
   providers: [MessageStatusApiService],
   imports: [MessageStatusModule],
})
export class MessageStatusApiModule {}
