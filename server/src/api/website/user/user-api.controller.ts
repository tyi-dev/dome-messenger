import { Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { WebsiteController } from '@server/src/decorators/website-controller.decorator';
import { UserApiService } from '@server/src/api/website/user/user-api.service';
import { CurrentUser } from '@server/src/decorators/current-user.decorator';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';
import { JwtGuarded } from '@server/src/decorators/jwt-guard.decorator';
import { UpdateUserRequest } from '@server/src/api/website/user/dto/update-user.request';
import { ConversationType } from '@shared/types/conversation';
import { UpdateLastSeenRequest } from '@server/src/api/website/user/dto/update-last-seen.request';

@WebsiteController('users')
export class UserApiController {
   constructor(private readonly userApiService: UserApiService) {}

   @UseGuards(JwtGuarded)
   @Get('me')
   async getMyProfile(@CurrentUser() user: JwtAuthPayload) {
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

   @UseGuards(JwtGuarded)
   @Put('update-last-seen')
   async updateLastSeen(@CurrentUser() user: JwtAuthPayload, @Body() data: UpdateLastSeenRequest) {
      return this.userApiService.updateLastSeen(user.id, data);
   }
}
