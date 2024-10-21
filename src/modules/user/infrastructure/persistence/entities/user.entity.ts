import { Base } from '@/common/infrastructure/entities/base.entity';
import { MessageEntity } from '@/modules/message/infrastructure/persistence/entities/message.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.user)
  messages: MessageEntity[];
}
