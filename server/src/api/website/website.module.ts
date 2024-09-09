import { Module } from '@nestjs/common';
import { AuthApiModule } from '@server/src/api/website/auth/auth-api.module';
import { UserApiModule } from '@server/src/api/website/user/user-api.module';

@Module({
   imports: [AuthApiModule, UserApiModule],
})
export class WebsiteApiModule {}
