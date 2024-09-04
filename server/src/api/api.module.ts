import { Module } from "@nestjs/common";
import { WebsiteApiModule } from "@server/src/api/website/website.module";

@Module({
  imports: [WebsiteApiModule],
})
export class ApiModule {}
