import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../interface/user.repository.interface';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { UserDomain } from '../../domain/user.domain';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { fromUpdateUserToUserDomain } from '../mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly mapperService: MapperService,
  ) {}

  async create(userInformation: CreateUserDto): Promise<UserDomain> {
    const passwordEncrypted = await bcrypt.hash(userInformation.password, 10);

    userInformation.password = passwordEncrypted;
    const userDomain = this.mapperService.dtoToClass(
      userInformation,
      new UserDomain(),
    );
    return await this.userRepository.create(userDomain);
  }

  async findAll(): Promise<UserDomain[]> {
    return await this.userRepository.findAll();
  }

  async findOneById(id: number): Promise<UserDomain | undefined> {
    return await this.userRepository.findOneById(id);
  }

  async findOneByUsername(username: string): Promise<UserDomain | undefined> {
    return await this.userRepository.findOneByUsername(username);
  }

  async findOneByEmail(email: string): Promise<UserDomain | undefined> {
    return await this.userRepository.findOneByEmail(email);
  }

  async isUserExist(username: string, email: string): Promise<boolean> {
    const userByUsername = await this.findOneByUsername(username);
    const userByEmail = await this.findOneByEmail(email);

    return userByUsername || userByEmail ? true : false;
  }

  async update(
    userId: number,
    updatedUserInformation: UpdateUserDto,
  ): Promise<any> {
    const userMapped = fromUpdateUserToUserDomain(updatedUserInformation);
    return await this.userRepository.update(userId, userMapped);
  }
}
