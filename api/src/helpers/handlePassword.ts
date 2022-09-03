import * as bcrypt from 'bcrypt';

export const CreatePassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const ComparePassword = async (password1: string, password2: string) => {
  return bcrypt.compare(password1, password2);
};
