import { Base } from '@/common/domain/base.domain';

export class UserDomain extends Base {
  id: number;
  name: string;
  email: string;
  password: string;
}
