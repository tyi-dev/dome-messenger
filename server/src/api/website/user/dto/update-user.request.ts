import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
   @IsNumber()
   @IsOptional()
   @ApiProperty()
   id: number;

   @IsString()
   @IsOptional()
   @ApiProperty()
   userName: string;

   @IsString()
   @IsOptional()
   @ApiProperty()
   firstName: string;

   @IsString()
   @IsOptional()
   @ApiProperty()
   lastName: string;

   @IsDateString()
   @IsOptional()
   @ApiProperty()
   lastSeen: string;

   @IsString()
   @IsOptional()
   @ApiProperty()
   phoneNumber: string;

   @IsString()
   @IsOptional()
   @ApiProperty()
   email: string;
}
