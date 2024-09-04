import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { AuthService } from "@server/src/core/auth/auth.service";

@Injectable()
export class AuthApiService {
  constructor(private readonly authService: AuthService) {}

  public async register(data: Prisma.UserCreateInput) {
    return this.authService.registerUser(data);
  }
}
