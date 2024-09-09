import { Injectable } from '@nestjs/common';
import { UserService } from '@server/src/core/user/user.service';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';

@Injectable()
export class UserApiService {
   constructor(private readonly userService: UserService) {}

   public async getUser(data: JwtAuthPayload) {
      return this.userService.getUser(data);
   }
}
