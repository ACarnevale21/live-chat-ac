import { Injectable } from '@nestjs/common';
import { IMessageRepository } from '../../application/interface/message.repository.interface';
import { MessageEntity } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagePostgreSQLRepository implements IMessageRepository {
  constructor(
    @InjectRepository(MessageEntity, process.env.DB_NAME)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async saveMessage(userId: number, content: string): Promise<MessageEntity> {
    try {
      const messageEntity = this.messageRepository.create({ userId, content });
      return await this.messageRepository.save(messageEntity);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getAllMessages(): Promise<MessageEntity[]> {
    try {
      return await this.messageRepository.find({ order: { createdAt: 'ASC' } });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
