import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';

@Injectable()
export class MessageStatusRepository {
   constructor(
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService<EnvironmentVariables>,
   ) {}

   public async create(data: Prisma.MessageStatusUncheckedCreateInput) {
      return this.prisma.messageStatus.create({ data });
   }

   public async update(statusId: number, data: Prisma.MessageStatusUpdateInput) {
      return this.prisma.messageStatus.update({ where: { id: statusId }, data: data });
   }

   public async getById(id: number) {
      return this.prisma.messageStatus.findUnique({ where: { id: id } });
   }
}
