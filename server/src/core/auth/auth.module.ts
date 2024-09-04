import { Module } from "@nestjs/common";
import { AuthService } from "@server/src/core/auth/auth.service";
import { RepositoriesModule } from "@server/src/core/repositories/repositories.module";

@Module({
  providers: [AuthService],
  exports: [AuthService],
  imports: [RepositoriesModule],
})
export class AuthModule {}
