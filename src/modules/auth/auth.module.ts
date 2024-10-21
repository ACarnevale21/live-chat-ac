import { Module } from '@nestjs/common';
import { AuthService } from './application/service/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './infrastructure/guard/authentication.guard';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenGuard } from './infrastructure/guard/access-token.guard';
import { AtStrategy } from './infrastructure/passport/at.strategy';
import { RtStrategy } from './infrastructure/passport/rt.strategy';
import { AUTH_REPOSITORY } from './application/interface/auth.repository';
import { AuthPostgreSQLRepository } from './infrastructure/persistence/auth.postgresql.repository';
import { AuthEntity } from './infrastructure/persistence/entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenGuard } from './infrastructure/guard/refresh-token.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    TypeOrmModule.forFeature([AuthEntity], process.env.DB_NAME),
  ],
  providers: [
    AuthService,
    AccessTokenGuard,
    RefreshTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthPostgreSQLRepository,
    },
    AtStrategy,
    RtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
