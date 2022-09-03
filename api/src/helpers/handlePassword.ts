import * as bcrypt from 'bcrypt';

export function createPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password1: string, password2: string) {
  return bcrypt.compare(password1, password2);
}
