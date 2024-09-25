import { Injectable } from '@nestjs/common';
import { UserRepository } from '@server/src/core/repositories/user.repository';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { UpdateUserRequest } from '@server/src/api/website/user/dto/update-user.request';

@Injectable()
export class UserService {
   constructor(private readonly userRepository: UserRepository) {}

   public async getUser(data: JwtAuthPayload) {
      return this.userRepository.getUser(data);
   }

   public async getUserById(id: number) {
      if (!id) return null;
      return this.userRepository.getUserById(id);
   }

   public async updateUser(userId: number, data: UpdateUserRequest) {
      const isEmailInUse = await this.userRepository.getUser({ email: data.email });
      const isPhoneNumberInUse = await this.userRepository.getUser({ phoneNumber: data.phoneNumber });
      if (isEmailInUse && isEmailInUse.id !== userId) throw new Error('Email is already in use');
      if (isPhoneNumberInUse && isPhoneNumberInUse.id !== userId) throw new Error('Phone number is already in use');
      return this.userRepository.updateUser(userId, data);
   }

   public async getUsers(currentUserId: number) {
      return this.userRepository.getUsers(currentUserId);
   }
}
