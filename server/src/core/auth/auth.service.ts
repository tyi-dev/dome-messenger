import { Injectable } from "@nestjs/common";
import { UserRepository } from "@server/src/core/repositories/user.repository";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async registerUser(data: Prisma.UserCreateInput) {
    return this.userRepository.create(data);
  }
}
