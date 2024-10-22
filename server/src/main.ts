import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { CommonResponseInterceptor } from '@server/src/interceptors/common-responce.interceptor';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(
      new ValidationPipe({
         transform: true,
         whitelist: true,
         strictGroups: true,
      }),
   );

   const configService = app.get(ConfigService<EnvironmentVariables>);

   app.enableCors({
      origin: [process.env.FRONT_END_URL],
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
      optionsSuccessStatus: 200,
   });

   app.useGlobalInterceptors(new CommonResponseInterceptor());

   await app.listen(configService.get('PORT'));
   Logger.log('Running on ' + configService.get('PORT'));
}
bootstrap().then();
