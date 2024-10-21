import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from '../application/service/auth.service';
import { LoginDto } from '../application/dto/login.dto';
import { AuthType } from '../domain/auth-type.enum';
import { Auth } from '../infrastructure/decorator/auth.decorator';
import { RegisterDto } from '../application/dto/register.dto';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Auth(AuthType.Refresh)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshToken(@Request() req) {
    const user = req.user;
    return this.authService.refreshToken(user['id'], user['refreshToken']);
  }

  @Auth(AuthType.Bearer)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Request() req) {
    const user = req.user;
    return this.authService.logout(user['id']);
  }
}
