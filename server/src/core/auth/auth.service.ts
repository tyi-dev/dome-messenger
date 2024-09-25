import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@server/src/core/repositories/user.repository';
import { SignInRequest } from '@server/src/api/dto/sign-in.request';
import { SignUpRequest } from '@server/src/api/dto/sign-up.request';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      private readonly userRepository: UserRepository,
      private readonly jwtService: JwtService,
   ) {}

   public async registerUser(data: SignUpRequest) {
      const currentUser = await this.userRepository.getUser({ email: data.email });
      if (currentUser) throw new BadRequestException('User already exists');

      const createdUser = await this.userRepository.create(data);
      const domeAccessToken = await this.signToken({
         id: createdUser.id,
         email: createdUser.email,
         phoneNumber: createdUser.phoneNumber,
         userName: createdUser.userName,
      });

      return { domeAccessToken };
   }

   public async signIn(data: SignInRequest) {
      const currentUser = await this.userRepository.singIn(data);
      if (!currentUser) throw new BadRequestException('User does not exist');

      const domeAccessToken = await this.signToken({
         id: currentUser.id,
         email: currentUser.email,
         phoneNumber: currentUser.phoneNumber,
         userName: currentUser.userName,
      });

      return { domeAccessToken };
   }

   private async signToken(data: JwtAuthPayload) {
      return this.jwtService.signAsync(data);
   }
}
