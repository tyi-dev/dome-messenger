import { Body, Post } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { AuthApiService } from '@server/src/api/website/auth/auth-api.service';

@WebsiteController('auth')
export class AuthApiController {
  constructor(private readonly authApiService: AuthApiService) {}

  @Post('register')
  async signUp(@Body() data: /*dto*/ any) {
    return this.authApiService.register(data);
  }
}
