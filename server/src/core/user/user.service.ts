import { Injectable } from '@nestjs/common';
import { UserRepository } from '@server/src/core/repositories/user.repository';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';

@Injectable()
export class UserService {
   constructor(private readonly userRepository: UserRepository) {}

   public async getUser(data: JwtAuthPayload) {
      return this.userRepository.getUser(data);
   }
}
