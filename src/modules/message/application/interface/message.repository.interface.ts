import { MessageEntity } from '../../infrastructure/persistence/entities/message.entity';
import { MessageDomain } from '../../domain/message.domain';

export const MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY';

export interface IMessageRepository {
  saveMessage(payload: MessageDomain): Promise<MessageEntity>;
  getAllMessages(): Promise<MessageEntity[]>;
}
