import {
  BadGatewayException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@/modules/user/application/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/response/login.response.dto';
import { ITokens } from '../interface/tokens.interface';
import { RegisterResponseDto } from '../dto/response/register.response.dto';
import { AUTH_REPOSITORY, IAuthRepository } from '../interface/auth.repository';
import { hashData } from '../utils/auth.utils';
import { authDomainMapper } from '../mapper/auth.mapper';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly authRepository: IAuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(userId: number, email: string): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { userId, email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      ),
      this.jwtService.signAsync(
        { userId, email },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '3d' },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = loginDto;
    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user.id, user.email);
    const refreshTokenHash = await hashData(tokens.refreshToken);
    await this.authRepository.updateRefreshToken(user.id, refreshTokenHash);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const user = await this.userService.findOne(registerDto.username);
    if (user) {
      throw new BadGatewayException('User already exists');
    }
    const userCreated = await this.userService.create(registerDto);

    const tokens = await this.getTokens(userCreated.id, userCreated.email);
    const refreshTokenHash = await hashData(tokens.refreshToken);

    const authDomainMapped = authDomainMapper(userCreated.id, refreshTokenHash);

    await this.authRepository.create(authDomainMapped);

    return {
      username: userCreated.username,
      email: userCreated.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(userId: number, refreshToken: string): Promise<ITokens> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { refreshToken: rtFromUser } =
      await this.authRepository.findRefreshTokenByUserId(userId);

    if (!rtFromUser) {
      throw new UnauthorizedException();
    }

    const rtMatches = await bcrypt.compare(refreshToken, rtFromUser);

    if (!rtMatches) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(userId, user.email);
    const refreshTokenHash = await hashData(tokens.refreshToken);
    await this.authRepository.updateRefreshToken(userId, refreshTokenHash);
    return tokens;
  }

  async logout(userId: number): Promise<void> {
    await this.authRepository.deleteRefreshToken(userId);
  }
}
