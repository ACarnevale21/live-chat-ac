import { Base } from '@/common/domain/base.domain';

export class MessageDomain extends Base {
  userId: number;
  content: string;
}
