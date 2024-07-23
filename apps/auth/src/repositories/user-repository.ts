import { Maybe, User } from '../types';
import { db } from './db';

export async function findUserByEmail(email: string): Promise<Maybe<User>> {
  return await db<User>('user')
    .where({
      email,
    })
    .first();
}

export async function findUserById(id: string): Promise<Maybe<User>> {
  return await db<User>('user')
    .where({
      id,
    })
    .first();
}

export async function addUser(user: Omit<User, 'createdAt'>): Promise<User> {
  const [addedUser] = await db<User>('user').insert(user, '*');
  return addedUser;
}
