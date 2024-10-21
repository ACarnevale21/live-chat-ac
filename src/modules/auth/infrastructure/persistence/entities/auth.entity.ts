import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '@/common/infrastructure/entities/base.entity';
import { UserEntity } from '@/modules/user/infrastructure/persistence/entities/user.entity';

@Entity({ name: 'auth' })
export class AuthEntity extends Base {
  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  user: UserEntity;
}
