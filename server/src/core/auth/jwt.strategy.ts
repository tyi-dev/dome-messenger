import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';
import { JWT_STRATEGY_NAME } from '@server/src/constants';
import { JwtAuthPayload } from '@server/src/api/dto/jwt-auth-payload.request';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_NAME) {
   constructor(
      authService: AuthService,
      private readonly configService: ConfigService<EnvironmentVariables>,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
         ignoreExpiration: false,
         secretOrKey: configService.get('JWT_SECRET'),
         passReqToCallback: true,
      });
   }

   public async validate(request: any, payload: JwtAuthPayload) {
      return payload;
   }
}
