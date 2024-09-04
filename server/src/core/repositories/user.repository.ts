import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../providers/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}
