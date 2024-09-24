import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class SignUpRequest {
   @IsString()
   @ApiProperty()
   firstName: string;

   @IsString()
   @ApiProperty()
   lastName: string;

   @IsString()
   @ApiProperty()
   phoneNumber: string;

   @IsString()
   @ApiProperty()
   userName: string;

   @IsString()
   @ApiProperty()
   @Transform((e) => e.value.toLowerCase().trim())
   email: string;

   @IsString()
   @ApiProperty()
   password: string;
}
