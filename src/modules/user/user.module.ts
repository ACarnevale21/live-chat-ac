import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './application/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@/common/common.module';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserPostgreSQLRepository } from './infrastructure/persistence/user.postgresql.repository';
import { USER_REPOSITORY } from './application/interface/user.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity], process.env.DB_NAME),
    CommonModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserPostgreSQLRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
