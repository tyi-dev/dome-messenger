import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMessageRequest {
   @IsString()
   @IsOptional()
   @ApiProperty()
   content: string;
}
