import { Base } from '@/common/infrastructure/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
