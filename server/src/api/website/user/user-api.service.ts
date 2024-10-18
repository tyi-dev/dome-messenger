import { Injectable } from '@nestjs/common';
import { UserService } from '@server/src/core/user/user.service';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { UpdateUserRequest } from '@server/src/api/website/user/dto/update-user.request';
import { ConversationType } from '@shared/types/conversation';
import { UpdateLastSeenRequest } from '@server/src/api/website/user/dto/update-last-seen.request';

@Injectable()
export class UserApiService {
   constructor(private readonly userService: UserService) {}

   public async getUser(data: JwtAuthPayload) {
      return this.userService.getUser(data);
   }

   public async getUserById(id: number) {
      return this.userService.getUserById(id);
   }

   public async updateLastSeen(userId: number, data: UpdateLastSeenRequest) {
      return this.userService.updateLastSeen(userId, data);
   }

   public async updateUser(userId: number, data: UpdateUserRequest) {
      return this.userService.updateUser(userId, data);
   }

   public async getUsers(currentUserId: number, conversationType?: ConversationType) {
      return this.userService.getUsers(currentUserId, conversationType);
   }
}
