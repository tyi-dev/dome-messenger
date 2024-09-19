import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { User } from '@shared/types/user';

export class CreateConversationRequest {
   @IsString()
   @ApiProperty()
   title: string;

   @IsArray()
   @ApiProperty()
   participants: User[];
}
