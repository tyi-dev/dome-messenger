import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { User } from '@shared/types/user';
import { ConversationType } from '@shared/types/conversation';

export class CreateConversationRequest {
   @IsString()
   @ApiProperty()
   title: string;

   @IsEnum(ConversationType)
   @ApiProperty()
   conversationType: ConversationType;

   @IsArray()
   @ApiProperty()
   participants: User[];
}
