import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Injectable()
export class ConversationRepository {
   constructor(private readonly prisma: PrismaService) {}

   public async create(data: Prisma.ConversationCreateInput) {
      return this.prisma.conversation.create({ data });
   }

   public async update(conversationId: number, data: Prisma.ConversationUpdateInput) {
      return this.prisma.conversation.update({ where: { id: conversationId }, data: data });
   }

   public async getByUserId(userId: number) {
      return this.prisma.conversation.findMany({
         where: { participants: { some: { userId: userId } } },
      });
   }

   public async getById(conversationId: number) {
      return this.prisma.conversation.findUnique({
         where: { id: conversationId },
      });
   }
}
