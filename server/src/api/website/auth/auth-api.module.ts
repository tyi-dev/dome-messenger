import { Module } from "@nestjs/common";
import { AuthApiService } from "@server/src/api/website/auth/auth-api.service";
import { AuthApiController } from "@server/src/api/website/auth/auth-api.controller";
import { AuthModule } from "@server/src/core/auth/auth.module";

@Module({
  controllers: [AuthApiController],
  providers: [AuthApiService],
  imports: [AuthModule],
})
export class AuthApiModule {}
