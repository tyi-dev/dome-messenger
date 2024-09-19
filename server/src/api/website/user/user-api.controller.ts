import { Body, Get, Put, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { UserApiService } from '@server/src/api/website/user/user-api.service';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';
import { UpdateUserRequest } from '@server/src/api/website/user/dto/update-user.request';

@WebsiteController('users')
export class UserApiController {
   constructor(private readonly userApiService: UserApiService) {}

   @UseGuards(JwtGuarded)
   @Get('me')
   async signIn(@CurrentUser() user: JwtAuthPayload) {
      return this.userApiService.getUser(user);
   }

   @UseGuards(JwtGuarded)
   @Put('update-profile')
   async updateUser(@CurrentUser() user: JwtAuthPayload, @Body() data: UpdateUserRequest) {
      return this.userApiService.updateUser(user.id, data);
   }
}
