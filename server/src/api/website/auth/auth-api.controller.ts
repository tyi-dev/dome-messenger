import { Body, Post } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { AuthApiService } from '@server/src/api/website/auth/auth-api.service';
import { SignUpRequest } from '@server/src/api/dto/sign-up.request';
import { SignInRequest } from '@server/src/api/dto/sign-in.request';

@WebsiteController('auth')
export class AuthApiController {
   constructor(private readonly authApiService: AuthApiService) {}

   @Post('register')
   async signUp(@Body() data: SignUpRequest) {
      return this.authApiService.register(data);
   }

   @Post('login')
   async signIn(@Body() data: SignInRequest) {
      return this.authApiService.login(data);
   }
}
