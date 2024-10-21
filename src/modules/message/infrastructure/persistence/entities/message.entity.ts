import { Column, Entity, ManyToOne } from 'typeorm';

import { Base } from '@common/infrastructure/entities/base.entity';
import { UserEntity } from '@/modules/user/infrastructure/persistence/entities/user.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends Base {
  @Column()
  userId: number;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.messages, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
