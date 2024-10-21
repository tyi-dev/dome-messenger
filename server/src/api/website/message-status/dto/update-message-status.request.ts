import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class UpdateMessageStatusRequest {
   @IsDateString()
   @ApiProperty()
   readAt: string;
}
