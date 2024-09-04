import { IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class EnvironmentVariables {
  @IsString()
  DATABASE_URL: string;

  @Transform((v) => v.value === "true")
  DB_LOGGING = false;

  @IsNumber()
  @Transform((v) => +v.value)
  PORT = 8080;
}
