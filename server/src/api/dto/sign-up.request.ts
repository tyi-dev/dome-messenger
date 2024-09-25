import { ApiProperty } from '@nestjs/swagger';
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
   email: string;

   @IsString()
   @ApiProperty()
   password: string;
}
