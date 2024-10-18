import { Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { UserApiService } from '@server/src/api/website/user/user-api.service';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';
import { UpdateUserRequest } from '@server/src/api/website/user/dto/update-user.request';
import { ConversationType } from '@shared/types/conversation';

@WebsiteController('users')
export class UserApiController {
   constructor(private readonly userApiService: UserApiService) {}

   @UseGuards(JwtGuarded)
   @Get('me')
   async getMyProfile(@CurrentUser() user: JwtAuthPayload) {
      const updateLastSeen: UpdateUserRequest = {
         email: user.email,
         firstName: undefined,
         id: user.id,
         lastName: undefined,
         phoneNumber: user.phoneNumber,
         userName: user.userName,
         lastSeen: new Date().toISOString(),
      };
      await this.userApiService.updateUser(user.id, updateLastSeen);
      return this.userApiService.getUser(user);
   }

   @UseGuards(JwtGuarded)
   @Get('search/:conversationType')
   async getUsers(@CurrentUser() user: JwtAuthPayload, @Param('conversationType') conversationType: ConversationType) {
      return this.userApiService.getUsers(user.id, conversationType);
   }

   @UseGuards(JwtGuarded)
   @Get(':userId')
   async getUser(@Param('userId') userId: number) {
      return this.userApiService.getUserById(userId);
   }

   @UseGuards(JwtGuarded)
   @Put('update-profile')
   async updateUser(@CurrentUser() user: JwtAuthPayload, @Body() data: UpdateUserRequest) {
      return this.userApiService.updateUser(user.id, data);
   }
}
