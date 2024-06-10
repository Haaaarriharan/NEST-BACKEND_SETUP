import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

export async function comparePassword(password: string, hash) {
  return await bcrypt.compare(password, hash);
}
