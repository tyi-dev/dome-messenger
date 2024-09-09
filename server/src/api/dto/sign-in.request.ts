import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class SignInRequest {
   @IsString()
   @ApiProperty()
   @Transform((e) => e.value.toLowerCase().trim())
   email: string;

   @IsString()
   @ApiProperty()
   password: string;
}
