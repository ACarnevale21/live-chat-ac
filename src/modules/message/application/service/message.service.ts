import { Inject, Injectable } from '@nestjs/common';
import {
  IMessageRepository,
  MESSAGE_REPOSITORY,
} from '../interface/message.repository.interface';
import { MessageDomain } from '../../domain/message.domain';
import { NewMessageDto } from '../dto/new-message.dto';
import { MapperService } from '@/common/application/mapper/mapper.service';

@Injectable()
export class MessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: IMessageRepository,
    private readonly mapperService: MapperService,
  ) {}

  async saveMessage(
    payload: NewMessageDto,
    userId: number,
  ): Promise<MessageDomain> {
    const message = this.mapperService.dtoToClass(
      { ...payload, userId },
      new MessageDomain(),
    );
    return this.messageRepository.saveMessage(message);
  }

  async getAllMessages(): Promise<MessageDomain[]> {
    return this.messageRepository.getAllMessages();
  }
}
