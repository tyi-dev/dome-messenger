import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class EnvironmentVariables {
   @IsString()
   DATABASE_URL: string;

   @Transform((v) => v.value === 'true')
   DB_LOGGING = false;

   @IsNumber()
   @Transform((v) => +v.value)
   PORT = 8080;

   @IsNumber()
   @Transform((v) => v.value)
   BCRYPT_SALT_ROUNDS = 10;

   @IsString()
   JWT_SECRET: string;

   @IsNumber()
   @Transform((v) => +v.value)
   JWT_EXPIRES_IN: number = 24 * 60 * 60 * 1000; // 1d
}
