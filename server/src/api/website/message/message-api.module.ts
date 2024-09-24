import { Module } from '@nestjs/common';
import { MessageApiController } from '@server/src/api/website/message/message-api.controller';
import { MessageApiService } from '@server/src/api/website/message/message-api.service';
import { MessageModule } from '@server/src/core/message/message.module';

@Module({
   controllers: [MessageApiController],
   providers: [MessageApiService],
   imports: [MessageModule],
})
export class MessageApiModule {}
