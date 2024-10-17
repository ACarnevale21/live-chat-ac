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
      // Enviar mensaje al destinatario
      targetSocket.emit('privateMessage', {
        from: fromUser,
        message,
      });

      // Confirmar al emisor que el mensaje ha sido enviado
      client.emit('privateMessage', {
        to: toUser,
        message,
      });
    } else {
      // Si el destinatario no está conectado
      client.emit('errorMessage', `Usuario ${toUser} no encontrado.`);
    }
  }

  sendPublicMessage(message: any, server: any) {
    // Emitir el mensaje públicamente a todos los clientes
    server.emit('message', message);
  }
}
