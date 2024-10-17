import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@/common/common.module';
import { MessageEntity } from './infrastructure/persistence/entities/message.entity';
import { MessageService } from './application/service/message.service';
import { MESSAGE_REPOSITORY } from './application/interface/message.repository.interface';
import { MessagePostgreSQLRepository } from './infrastructure/persistence/message.postgresql.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity], process.env.DB_NAME),
    CommonModule,
  ],
  providers: [
    MessageService,
    {
      provide: MESSAGE_REPOSITORY,
      useClass: MessagePostgreSQLRepository,
    },
  ],
  exports: [
    MessageService,
    {
      provide: MESSAGE_REPOSITORY,
      useClass: MessagePostgreSQLRepository,
    },
  ],
})
export class MessageModule {}
