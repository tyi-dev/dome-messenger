import { Injectable } from '@nestjs/common';
import { UserService } from '@server/src/core/user/user.service';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { UpdateUserRequest } from '@server/src/api/website/user/dto/update-user.request';

@Injectable()
export class UserApiService {
   constructor(private readonly userService: UserService) {}

   public async getUser(data: JwtAuthPayload) {
      return this.userService.getUser(data);
   }

   public async getUserById(id: number) {
      return this.userService.getUserById(id);
   }

   public async updateUser(userId: number, data: UpdateUserRequest) {
      return this.userService.updateUser(userId, data);
   }

   public async getUsers(currentUserId: number) {
      return this.userService.getUsers(currentUserId);
   }
}
