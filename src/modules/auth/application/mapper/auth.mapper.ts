import { AuthDomain } from '../../domain/auth.domain';

export function authDomainMapper(
  userId: number,
  refreshToken: string,
): AuthDomain {
  return {
    userId,
    refreshToken,
  };
}
