import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
   @IsNumber()
   @IsOptional()
   @ApiProperty()
   id: number;

   @IsString()
   @IsOptional()
   @ApiProperty()
   firstName: string;

   @IsString()
   @IsOptional()
   @ApiProperty()
   lastName: string;

   @IsString()
   @IsOptional()
   @ApiProperty()
   phoneNumber: string;

   @IsString()
   @IsOptional()
   @ApiProperty()
   @Transform((e) => e.value.toLowerCase().trim())
   email: string;
}
