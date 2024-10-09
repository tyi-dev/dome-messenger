import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prismaExclude, PrismaService } from '../../providers/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';

@Injectable()
export class ConversationParticipantRepository {
   constructor(
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService<EnvironmentVariables>,
   ) {}

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
