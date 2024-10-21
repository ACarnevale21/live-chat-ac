import { MessageEntity } from '../../infrastructure/persistence/entities/message.entity';

export const MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY';

export interface IMessageRepository {
  saveMessage(userId: number, content: string): Promise<MessageEntity>;
  getAllMessages(): Promise<MessageEntity[]>;
}
