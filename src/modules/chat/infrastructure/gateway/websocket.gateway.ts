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

  async handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.chatConnectionService.unregisterUser(client);
  }

  @SubscribeMessage('register')
  handleRegister(client: Socket, username: string) {
    this.chatConnectionService.registerUser(username, client);
  }

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    payload: { user: string; message: string },
  ) {
    const savedMessage = await this.messageService.saveMessage(
      payload.user,
      payload.message,
    );

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
      this.chatMessagingService.sendPublicMessage(savedMessage, this.server);
    }
  }
}
