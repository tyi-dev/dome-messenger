import { Injectable } from '@nestjs/common';
import { AuthService } from '@server/src/core/auth/auth.service';
import { SignUpRequest } from '@server/src/api/dto/sign-up.request';
import { SignInRequest } from '@server/src/api/dto/sign-in.request';

@Injectable()
export class AuthApiService {
   constructor(private readonly authService: AuthService) {}

   public async register(data: SignUpRequest) {
      return this.authService.registerUser(data);
   }

   public async login(data: SignInRequest) {
      return this.authService.signIn(data);
   }
}
