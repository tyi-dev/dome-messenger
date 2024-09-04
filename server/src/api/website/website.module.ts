import { Module } from "@nestjs/common";
import { AuthApiModule } from "@server/src/api/website/auth/auth-api.module";

@Module({
  imports: [AuthApiModule],
})
export class WebsiteApiModule {}
