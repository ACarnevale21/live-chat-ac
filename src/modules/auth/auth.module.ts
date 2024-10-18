import { Module } from '@nestjs/common';
import { AuthService } from './application/service/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './application/controller/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './infrastructure/guard/authentication.guard';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenGuard } from './infrastructure/guard/access-token.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
