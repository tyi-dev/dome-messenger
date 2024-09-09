import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY_NAME } from '@server/src/constants';

@Injectable()
export class JwtGuarded extends AuthGuard(JWT_STRATEGY_NAME) {}
