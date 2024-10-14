import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prismaExclude, PrismaService } from '@server/src/providers/prisma/prisma.service';

@Injectable()
export class ConversationParticipantRepository {
   constructor(private readonly prisma: PrismaService) {}

   public async create(data: Prisma.ConversationParticipantUncheckedCreateInput) {
      return this.prisma.conversationParticipant.create({ data });
   }

   public async update(participantId: number, data: Prisma.ConversationParticipantUpdateInput) {
      return this.prisma.conversationParticipant.update({ where: { id: participantId }, data: data });
   }

   public async checkIfUserIsAPartOfConversation(userId: number, conversationId: number) {
      return this.prisma.conversationParticipant.findUnique({
         where: { userId_conversationId: { userId: userId, conversationId: conversationId } },
      });
   }

   public async getConversationParticipant(conversationId: number, currentUserId: number) {
      return this.prisma.conversationParticipant.findUnique({
         where: {
            userId_conversationId: {
               userId: currentUserId,
               conversationId: conversationId,
            },
         },
      });
   }

   public async getConversationParticipants(conversationId: number, currentUserId?: number) {
      if (!currentUserId)
         return this.prisma.conversationParticipant.findMany({
            where: { conversationId },
            include: {
               user: {
                  select: prismaExclude('User', ['password']),
               },
            },
         });

      const conversation = await this.prisma.conversation.findUnique({
         where: { id: conversationId },
         select: { conversationType: true },
      });

      return this.prisma.conversationParticipant.findMany({
         where: {
            conversationId,
            ...(conversation.conversationType === 'P2P' && {
               userId: { not: currentUserId },
            }),
         },

         include: {
            user: {
               select: prismaExclude('User', ['password']),
            },
         },
      });
   }

   public async getById(id: number) {
      return this.prisma.conversationParticipant.findUnique({ where: { id: id } });
   }
}
