import { Base } from '@/common/infrastructure/entities/base.entity';
import { AuthEntity } from '@/modules/auth/infrastructure/persistence/entities/auth.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => AuthEntity, (refreshToken) => refreshToken.user)
  refreshTokens: AuthEntity[];
}
