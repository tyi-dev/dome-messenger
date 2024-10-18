import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateLastSeenRequest {
   @IsDateString()
   @IsOptional()
   @ApiProperty()
   lastSeen: string;
}
