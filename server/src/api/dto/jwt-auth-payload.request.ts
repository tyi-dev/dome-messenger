import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class JwtAuthPayload {
   @IsNumber()
   @ApiProperty()
   id: number;

   @IsString()
   @ApiProperty()
   @Transform((e) => e.value.toLowerCase().trim())
   email: string;

   @IsString()
   @ApiProperty()
   phoneNumber: string;
}
