import { Module } from '@nestjs/common';
import { MessageService } from '../message/application/service/message.service';
import { ChatGateway } from './infrastructure/gateway/websocket.gateway';
import { MessageModule } from '../message/message.module';
import { ChatConnectionService } from './application/service/chat-connection.service';
import { ChatMessagingService } from './application/service/chat-messaging.service';

@Module({
  imports: [MessageModule],
  providers: [
    MessageService,
    ChatGateway,
    ChatConnectionService,
    ChatMessagingService,
  ],
  exports: [],
})
export class ChatModule {}
