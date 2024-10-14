import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prismaExclude, PrismaService } from '../../providers/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';
import { SignInRequest } from '@server/src/api/dto/sign-in.request';
import { ConversationType } from '@shared/types/conversation';

@Injectable()
export class UserRepository {
   constructor(
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService<EnvironmentVariables>,
   ) {}

   public async create(data: Prisma.UserCreateInput) {
      data.password = await this.hashPassword(data.password);
      return this.prisma.user.create({ data });
   }

   public async singIn(data: SignInRequest) {
      const user = await this.prisma.user.findUnique({ where: { email: data.email } });
      if (!user) return null;

      const { password: userPassword, ...userData } = user;
      const match = await bcrypt.compare(data.password, userPassword);
      if (!match) return null;

      return userData;
   }

   //can return user by unique params such as: id, email, phoneNumber
   public async getUser(params: Prisma.UserWhereUniqueInput) {
      return this.prisma.user.findUnique({ where: params, select: prismaExclude('User', ['password']) });
   }

   public async getUserById(id: number) {
      return this.prisma.user.findUnique({ where: { id: id }, select: prismaExclude('User', ['password']) });
   }

   public async updateUser(userId: number, data: Prisma.UserUpdateInput) {
      return this.prisma.user.update({
         where: {
            id: userId,
         },
         data: data,
      });
   }

   public async getUsersToCreateConversation(currentUserId: number, conversationType: ConversationType) {
      const P2PRequest = {
         select: {
            id: true,
            userName: true,
         },
         where: {
            id: {
               not: currentUserId,
            },
            conversations: {
               none: {
                  conversation: {
                     participants: {
                        some: {
                           userId: currentUserId,
                        },
                     },
                  },
               },
            },
         },
      };
      const defaultRequest = {
         select: {
            id: true,
            userName: true,
         },
         where: {
            id: {
               not: currentUserId,
            },
         },
      };
      return this.prisma.user.findMany(conversationType === ConversationType.P2P ? P2PRequest : defaultRequest);
   }

   private async hashPassword(password: string) {
      return await bcrypt.hash(password, this.configService.get('BCRYPT_SALT_ROUNDS'));
   }
}
