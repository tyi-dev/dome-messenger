import { Module } from "@nestjs/common";
import { UserRepository } from "@server/src/core/repositories/user.repository";
import { PrismaModule } from "@server/src/providers/prisma/prisma.module";

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
  imports: [PrismaModule],
})
export class RepositoriesModule {}
