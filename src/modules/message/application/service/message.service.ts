import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageRepository,
  MESSAGE_REPOSITORY,
} from '../interface/message.repository.interface';
import { MessageDomain } from '../../domain/message.domain';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: IMessageRepository,
  ) {}

  async saveMessage(user: string, content: string): Promise<MessageDomain> {
    return this.messageRepository.saveMessage(user, content);
  }

  async getAllMessages(): Promise<MessageDomain[]> {
    return this.messageRepository.getAllMessages();
  }
}
