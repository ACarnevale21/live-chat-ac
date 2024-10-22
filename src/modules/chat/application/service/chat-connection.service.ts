import { CustomSocket } from '@/modules/auth/application/interface/socket-custom.interface';
import { UserState } from '@/modules/user/application/enum/user-state.enum';
import { UserService } from '@/modules/user/application/service/user.service';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatConnectionService {
  constructor(private readonly userService: UserService) {}
  async registerUser(userId: number, client: Socket) {
    return this.userService.update(userId, { state: UserState.ONLINE });
  }

  unregisterUser(userId: number, client: Socket) {
    return this.userService.update(userId, {
      state: UserState.OFFLINE,
    });
  }
}
