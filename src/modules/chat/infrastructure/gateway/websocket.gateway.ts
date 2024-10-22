import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatConnectionService } from '../../application/service/chat-connection.service';
import { MessageService } from '@/modules/message/application/service/message.service';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '@/modules/auth/infrastructure/guard/gateway.guard';
import { NewMessageDto } from '@/modules/message/application/dto/new-message.dto';
import { CustomSocket } from '@/modules/auth/application/interface/socket-custom.interface';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly chatConnectionService: ChatConnectionService,
    private readonly messageService: MessageService,
  ) {}

  async handleConnection(client: Socket) {
    this.server.emit('newConnection', `${client.id} is Online`);
  }

  async handleDisconnect(client: Socket) {
    this.server.emit('newDisconnection', `${client.id} is Offline`);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('newMessage')
  async handleEvent(
    client: CustomSocket,
    payload: NewMessageDto,
  ): Promise<string> {
    const userId = client.user.id;
    const newMessage = await this.messageService.saveMessage(payload, userId);
    this.server.emit('chat', payload);
    return newMessage.content;
  }
}
