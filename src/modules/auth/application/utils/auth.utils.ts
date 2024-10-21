import * as bcrypt from 'bcrypt';

export async function hashData(data: string): Promise<string> {
  return bcrypt.hash(data, 10);
}
