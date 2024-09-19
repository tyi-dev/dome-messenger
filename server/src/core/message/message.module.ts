import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { MessageService } from '@server/src/core/message/message.service';

@Module({
   providers: [MessageService],
   exports: [MessageService],
   imports: [RepositoriesModule],
})
export class MessageModule {}
