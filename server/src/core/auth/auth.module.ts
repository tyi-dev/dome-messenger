import { Module } from '@nestjs/common';
import { AuthService } from '@server/src/core/auth/auth.service';
import { RepositoriesModule } from '@server/src/core/repositories/repositories.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@server/src/core/config/environment-variables';
import { JwtStrategy } from '@server/src/core/auth/jwt.strategy';

@Module({
   providers: [AuthService, JwtStrategy],
   exports: [AuthService],
   imports: [
      RepositoriesModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.registerAsync({
         global: true,
         useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
         }),
         inject: [ConfigService],
      }),
   ],
})
export class AuthModule {}
