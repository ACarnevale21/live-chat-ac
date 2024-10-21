import { Injectable } from '@nestjs/common';
import { ChatConnectionService } from './chat-connection.service';
import { Socket } from 'socket.io';

@Injectable()
export class ChatMessagingService {
  constructor(private readonly chatConnectionService: ChatConnectionService) {}

  sendPrivateMessage(
    fromUser: string,
    toUser: string,
    message: string,
    client: Socket,
  ) {
    const targetSocket = this.chatConnectionService.getUserSocket(toUser);
    if (targetSocket) {
      targetSocket.emit('privateMessage', {
        from: fromUser,
        message,
      });

      client.emit('privateMessage', {
        to: toUser,
        message,
      });
    } else {
      client.emit('errorMessage', `Usuario ${toUser} no encontrado.`);
    }
  }

  sendPublicMessage(message: any, server: any) {
    server.emit('message', message);
  }
}
