import { AuthDomain } from '../../domain/auth.domain';
import { AuthEntity } from '../../infrastructure/persistence/entities/auth.entity';
import { ITokens } from './tokens.interface';

export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthRepository {
  create(authData: AuthDomain): Promise<AuthDomain>;
  findRefreshTokenByUserId(userId: number): Promise<AuthEntity | undefined>;
  updateRefreshToken(userId: number, refreshToken: string): Promise<ITokens>;
  deleteRefreshToken(userId: number): Promise<any>;
}
