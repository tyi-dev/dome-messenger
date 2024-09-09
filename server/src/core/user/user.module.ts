import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { UserService } from '@server/src/core/user/user.service';

@Module({
   providers: [UserService],
   exports: [UserService],
   imports: [RepositoriesModule],
})
export class UserModule {}
