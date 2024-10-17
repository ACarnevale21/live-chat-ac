import { Column, Entity } from 'typeorm';

import { Base } from '@common/infrastructure/entities/base.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends Base {
  @Column()
  user: string;

  @Column()
  content: string;
}
