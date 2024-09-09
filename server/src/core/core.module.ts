import { Module } from '@nestjs/common';
import { AuthModule } from '@server/src/core/auth/auth.module';
import { ConfigModule } from '@server/src/core/config/config.module';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { UserModule } from '@server/src/core/user/user.module';

@Module({
   imports: [AuthModule, UserModule, ConfigModule, RepositoriesModule],
})
export class CoreModule {}
