import { Injectable } from '@nestjs/common';
import { UserRepository } from '@server/src/core/repositories/user.repository';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { UpdateUserRequest } from '@server/src/api/website/user/dto/update-user.request';
import { JwtService } from '@nestjs/jwt';
import { ConversationType } from '@shared/types/conversation';
import { UpdateLastSeenRequest } from '@server/src/api/website/user/dto/update-last-seen.request';

@Injectable()
export class UserService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly jwtService: JwtService,
   ) {}

   public async getUser(data: JwtAuthPayload) {
      return this.userRepository.getUser(data);
   }

   public async getUserById(id: number) {
      if (!id) return null;
      return this.userRepository.getUserById(id);
   }

   public async getUserByAuthToken(token: string) {
      const user = await this.jwtService.verifyAsync<JwtAuthPayload>(token);
      return { ...user };
   }

   public async updateLastSeen(userId: number, data: UpdateLastSeenRequest) {
      return this.userRepository.updateUser(userId, data);
   }

   public async updateUser(userId: number, data: UpdateUserRequest) {
      const isEmailInUse = await this.userRepository.getUser({ email: data.email });
      const isPhoneNumberInUse = await this.userRepository.getUser({ phoneNumber: data.phoneNumber });
      const isUserNameInUse = await this.userRepository.getUser({ userName: data.userName });
      if (isUserNameInUse && isUserNameInUse.id !== userId) throw new Error('User name is already in use');
      if (isEmailInUse && isEmailInUse.id !== userId) throw new Error('Email is already in use');
      if (isPhoneNumberInUse && isPhoneNumberInUse.id !== userId) throw new Error('Phone number is already in use');
      return this.userRepository.updateUser(userId, data);
   }

   public async getUsers(currentUserId: number, conversationType?: ConversationType) {
      return this.userRepository.getUsersToCreateConversation(currentUserId, conversationType);
   }
}
