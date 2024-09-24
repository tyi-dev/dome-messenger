import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateMessageStatusRequest {
   @IsString()
   @ApiProperty()
   readAt: string;
}
