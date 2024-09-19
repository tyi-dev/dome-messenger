import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';

@Injectable()
export class MessageRepository {
   constructor(
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService<EnvironmentVariables>,
   ) {}

   public async create(data: Prisma.MessageUncheckedCreateInput) {
      return this.prisma.message.create({ data });
   }

   public async update(messageId: number, data: Prisma.MessageUncheckedUpdateInput) {
      return this.prisma.message.update({ where: { id: messageId }, data: data });
   }

   public async getById(id: number) {
      return this.prisma.message.findUnique({ where: { id: id } });
   }
}
