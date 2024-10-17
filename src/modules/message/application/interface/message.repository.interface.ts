import { MessageEntity } from '../../infrastructure/persistence/entities/message.entity';

export const MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY';

export interface IMessageRepository {
  saveMessage(user: string, content: string): Promise<MessageEntity>;
  getAllMessages(): Promise<MessageEntity[]>;
}
