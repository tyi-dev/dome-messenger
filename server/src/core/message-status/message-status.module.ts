import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { MessageStatusService } from '@server/src/core/message-status/message-status.service';

@Module({
   providers: [MessageStatusService],
   exports: [MessageStatusService],
   imports: [RepositoriesModule],
})
export class MessageStatusModule {}
