import { Base } from '@/common/domain/base.domain';
import { UserState } from '../application/enum/user-state.enum';

export class UserDomain extends Base {
  username: string;
  email: string;
  password: string;
  state?: UserState;
}
