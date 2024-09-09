import { Module } from '@nestjs/common';
import { UserApiController } from '@server/src/api/website/user/user-api.controller';
import { UserApiService } from '@server/src/api/website/user/user-api.service';
import { UserModule } from '@server/src/core/user/user.module';

@Module({
   controllers: [UserApiController],
   providers: [UserApiService],
   imports: [UserModule],
})
export class UserApiModule {}
