import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateMessageRequest {
   @IsNumber()
   @ApiProperty()
   id: number;

   @IsString()
   @ApiProperty()
   content: string;

   @IsNumber()
   @ApiProperty()
   conversationId: number;
}
