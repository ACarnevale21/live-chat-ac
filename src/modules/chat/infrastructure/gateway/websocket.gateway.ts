import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatConnectionService } from '../../application/service/chat-connection.service';
import { ChatMessagingService } from '../../application/service/chat-messaging.service';
import { MessageService } from '@/modules/message/application/service/message.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatConnectionService: ChatConnectionService,
    private readonly chatMessagingService: ChatMessagingService,
    private readonly messageService: MessageService,
  ) {}

  // Manejar la conexión de un cliente
  async handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  // Manejar la desconexión de un cliente
  handleDisconnect(client: Socket) {
    this.chatConnectionService.unregisterUser(client);
  }

  // Manejar el registro de usuarios
  @SubscribeMessage('register')
  handleRegister(client: Socket, username: string) {
    this.chatConnectionService.registerUser(username, client);
  }

  // Manejar los mensajes enviados
  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    payload: { user: string; message: string },
  ) {
    const savedMessage = await this.messageService.saveMessage(
      payload.user,
      payload.message,
    );

    // Si es un mensaje privado
    if (payload.message.startsWith('/private')) {
      const [_, targetUser, ...messageParts] = payload.message.split(' ');
      const message = messageParts.join(' ');
      this.chatMessagingService.sendPrivateMessage(
        payload.user,
        targetUser,
        message,
        client,
      );
    } else {
      // Si es un mensaje público
      this.chatMessagingService.sendPublicMessage(savedMessage, this.server);
    }
  }
}
