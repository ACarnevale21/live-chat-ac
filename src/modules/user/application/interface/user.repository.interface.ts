import { UserDomain } from '../../domain/user.domain';
import { UserEntity } from '../../infrastructure/persistence/entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  create(userInformation: UserDomain): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findOneById(id: number): Promise<UserEntity | undefined>;
  findOneByUsername(username: string): Promise<UserEntity | undefined>;
  findOneByEmail(email: string): Promise<UserEntity | undefined>;
}
