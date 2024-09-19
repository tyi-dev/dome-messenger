import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMessageRequest {
   @IsString()
   @ApiProperty()
   content: string;

   @IsNumber()
   @ApiProperty()
   conversationId: number;
}
