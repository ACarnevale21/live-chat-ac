import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/application/service/user.service';
import { CustomSocket } from '../../application/interface/socket-custom.interface';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: CustomSocket = context.switchToWs().getClient<CustomSocket>();
    const token = client.handshake.headers.authorization;

    if (!token) {
      throw new WsException('No authorization token');
    }

    const [_, tokenValue] = token.split(' ');

    try {
      const decoded = await this.jwtService.verify(tokenValue);
      console.log(decoded);
      const user = await this.userService.findOneById(decoded.userId);
      console.log(user);
      if (user) {
        client.user = user;
        return true;
      } else {
        throw new WsException('Invalid user');
      }
    } catch (ex) {
      throw new WsException(ex.message);
    }
  }
}
