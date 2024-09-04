import { Prisma, PrismaClient } from "@prisma/client";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EnvironmentVariables } from "../../core/config/environment-variables";

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[],
) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(readonly configService: ConfigService<EnvironmentVariables>) {
    const opts: Prisma.PrismaClientOptions = {};
    if (configService.get("DB_LOGGING")) {
      opts.log = ["query", "info", "warn", "error"];
    }
    super(opts);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
