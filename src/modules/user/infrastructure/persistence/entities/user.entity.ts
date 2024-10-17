import { Base } from '@/common/infrastructure/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
