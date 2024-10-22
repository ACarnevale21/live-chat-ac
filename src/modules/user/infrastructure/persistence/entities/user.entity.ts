import { Base } from '@/common/infrastructure/entities/base.entity';
import { AuthEntity } from '@/modules/auth/infrastructure/persistence/entities/auth.entity';
import { MessageEntity } from '@/modules/message/infrastructure/persistence/entities/message.entity';
import { UserState } from '@/modules/user/application/enum/user-state.enum';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ enum: UserState, default: UserState.OFFLINE })
  state: UserState;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @OneToMany(() => AuthEntity, (refreshToken) => refreshToken.user)
  refreshTokens: AuthEntity[];
}
