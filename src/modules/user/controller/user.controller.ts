import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../application/service/user.service';
import { CreateUserDto } from '../application/dto/request/create-user.dto';
import { UserDomain } from '../domain/user.domain';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDomain[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserDomain> {
    return this.userService.findOneById(id);
  }

  @Get(':username')
  async findOneByUsername(
    @Param('username') username: string,
  ): Promise<UserDomain> {
    return this.userService.findOneByUsername(username);
  }
}
