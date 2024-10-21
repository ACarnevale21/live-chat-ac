import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../interface/user.repository.interface';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { MapperService } from '@/common/application/mapper/mapper.service';
import { UserDomain } from '../../domain/user.domain';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly mapperService: MapperService,
  ) {}

  async create(userInformation: CreateUserDto): Promise<UserDomain> {
    const userDomain = this.mapperService.dtoToClass(
      userInformation,
      new UserDomain(),
    );
    return await this.userRepository.create(userDomain);
  }
}
