import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@/modules/user/application/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/sign-up.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUsername(username);

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpData: SignUpDto): Promise<any> {
    const user = await this.userService.isUserExist(
      signUpData.username,
      signUpData.email,
    );
    if (user) {
      throw new BadGatewayException('User already exists');
    }
    const userCreated = await this.userService.create(signUpData);

    const payload = { sub: userCreated.id, username: userCreated.username };
    return {
      username: userCreated.username,
      email: userCreated.email,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
