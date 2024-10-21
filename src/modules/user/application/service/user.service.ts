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

  async findOne(username: string): Promise<UserDomain | undefined> {
    return await this.userRepository.findOne(username);
  }

  async findOneById(userId: number): Promise<UserDomain | undefined> {
    return await this.userRepository.findOneById(userId);
  }

  async update(
    userId: number,
    updatedUserInformation: UpdateUserDto,
  ): Promise<any> {
    const userMapped = fromUpdateUserToUserDomain(updatedUserInformation);
    return await this.userRepository.update(userId, userMapped);
  }
}
