import { Module } from '@nestjs/common';
import { MessageService } from '../message/application/service/message.service';
import { ChatGateway } from './infrastructure/gateway/websocket.gateway';
import { MessageModule } from '../message/message.module';
import { ChatConnectionService } from './application/service/chat-connection.service';
import { UserModule } from '../user/user.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [MessageModule, UserModule, CommonModule],
  providers: [MessageService, ChatGateway, ChatConnectionService],
  exports: [],
})
export class ChatModule {}
