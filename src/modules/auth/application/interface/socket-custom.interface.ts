import { UserDomain } from '@/modules/user/domain/user.domain';
import { Socket } from 'socket.io';

export interface CustomSocket extends Socket {
  user?: UserDomain;
}
