import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';

@Injectable()
export class ConversationRepository {
   constructor(
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService<EnvironmentVariables>,
   ) {}

   public async create(data: Prisma.ConversationCreateInput) {
      return this.prisma.conversation.create({ data });
   }

   public async update(conversationId: number, data: Prisma.ConversationUpdateInput) {
      return this.prisma.conversation.update({ where: { id: conversationId }, data: data });
   }

   public async getByUserId(userId: number) {
      return this.prisma.conversation.findMany({
         where: { participants: { some: { userId: userId } } },
         include: {
            participants: true,
            messages: {
               include: { status: true },
            },
         },
      });
   }

   public async getById(conversationId: number) {
      return this.prisma.conversation.findUnique({
         where: { id: conversationId },
         include: {
            participants: true,
            messages: {
               include: { status: true },
            },
         },
      });
   }
}
