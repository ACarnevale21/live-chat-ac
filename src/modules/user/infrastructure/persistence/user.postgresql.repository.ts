import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../application/interface/user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDomain } from '../../domain/user.domain';

@Injectable()
export class UserPostgreSQLRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity, process.env.DB_NAME)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userInformation: UserDomain): Promise<UserEntity> {
    try {
      const userEntity = this.userRepository.create(userInformation);
      return await this.userRepository.save(userEntity);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
