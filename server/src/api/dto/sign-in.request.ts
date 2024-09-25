import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInRequest {
   @IsString()
   @ApiProperty()
   email: string;

   @IsString()
   @ApiProperty()
   password: string;
}
