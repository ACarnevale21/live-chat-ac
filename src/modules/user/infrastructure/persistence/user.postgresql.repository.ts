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

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findOneById(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ where: { username } });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ where: { email } });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async update(
    id: number,
    updatedUserInformation: Partial<UserDomain>,
  ): Promise<UserEntity> {
    try {
      const userUpdate = await this.userRepository.preload({
        id,
        ...updatedUserInformation,
      });

      if (!userUpdate) {
        throw new Error(`user #${id} do not exist`);
      }

      return await this.userRepository.save(userUpdate);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
