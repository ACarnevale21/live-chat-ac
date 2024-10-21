import { BadRequestException } from '@nestjs/common';

export class UserAlreadyVerifiedException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}
