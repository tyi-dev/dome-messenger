import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class JwtAuthPayload {
   @IsNumber()
   @ApiProperty()
   id: number;

   @IsString()
   @ApiProperty()
   email: string;

   @IsString()
   @ApiProperty()
   phoneNumber: string;

   @IsString()
   @ApiProperty()
   userName: string;
}
