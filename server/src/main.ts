import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "@server/src/core/config/environment-variables";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvironmentVariables>);
  await app.listen(configService.get("PORT"));
  Logger.log("Running on " + configService.get("PORT"));
}
bootstrap().then();
