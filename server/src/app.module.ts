import { Module } from "@nestjs/common";
import { ApiModule } from "./api/api.module";
import { CoreModule } from "./core/core.module";

@Module({
  imports: [ApiModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

/*export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
        .apply(RawBodyParserMiddleware)
        .forRoutes({
          path: '/webhook/stripe',
          method: RequestMethod.POST,
        })
        .apply(JsonBodyParserMiddleware)
        .forRoutes('*');
  }
}*/
