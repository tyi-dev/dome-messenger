import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { MessageService } from '@server/src/core/message/message.service';
import { UserService } from '@server/src/core/user/user.service';

@Module({
   providers: [MessageService, UserService],
   exports: [MessageService],
   imports: [RepositoriesModule],
})
export class MessageModule {}
