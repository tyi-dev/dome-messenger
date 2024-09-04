import { Transform } from 'class-transformer';
import { IsArray, IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;
}
