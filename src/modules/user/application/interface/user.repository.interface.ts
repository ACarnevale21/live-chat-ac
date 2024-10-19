import { UserDomain } from '../../domain/user.domain';
import { UserEntity } from '../../infrastructure/persistence/entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  create(userInformation: UserDomain): Promise<UserEntity>;
  findOne(username: string): Promise<UserEntity | undefined>;
}
