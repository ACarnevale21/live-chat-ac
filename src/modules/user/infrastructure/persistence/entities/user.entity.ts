import { Base } from '@/common/infrastructure/entities/base.entity';
import { AuthEntity } from '@/modules/auth/infrastructure/persistence/entities/auth.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => AuthEntity, (refreshToken) => refreshToken.user)
  refreshTokens: AuthEntity[];
}
