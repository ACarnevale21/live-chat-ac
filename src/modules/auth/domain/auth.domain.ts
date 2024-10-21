import { Base } from '@/common/domain/base.domain';

export class AuthDomain extends Base {
  refreshToken: string;
  userId: number;
}
