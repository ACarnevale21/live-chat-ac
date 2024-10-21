import { Injectable } from '@nestjs/common';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthRepository } from '../../application/interface/auth.repository';
import { AuthDomain } from '../../domain/auth.domain';

@Injectable()
export class AuthPostgreSQLRepository implements IAuthRepository {
  constructor(
    @InjectRepository(AuthEntity, process.env.DB_NAME)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async create(authData: AuthDomain): Promise<AuthEntity> {
    try {
      const authEntity = this.authRepository.create(authData);
      return await this.authRepository.save(authEntity);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findRefreshTokenByUserId(
    userId: number,
  ): Promise<AuthEntity | undefined> {
    try {
      return await this.authRepository.findOne({
        where: { userId },
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<any> {
    try {
      const authEntity = await this.authRepository.findOne({
        where: { userId },
      });

      if (!authEntity) {
        throw new Error('User id not found');
      }

      await this.authRepository.update(authEntity.id, {
        refreshToken: refreshToken,
      });

      return { refreshToken };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async deleteRefreshToken(userId: number): Promise<any> {
    try {
      const authEntity = await this.authRepository.findOne({
        where: { userId },
      });

      if (!authEntity) {
        throw new Error('User id not found');
      }

      await this.authRepository.update(authEntity.id, {
        refreshToken: null,
      });

      return { message: 'Refresh token deleted' };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
