import { Base } from '@/common/domain/base.domain';

export class UserDomain extends Base {
  username: string;
  email: string;
  password: string;
}
