import { v4 as uuid } from 'uuid';
import { FederatedProvider, User } from '../types';
import { findUserIdentity, addUserIdentity } from '../repositories/federated-identity-repository';
import { findUserByEmail, addUser, findUserById } from '../repositories/user-repository';

export async function authenticate(
  providerId: string,
  email: string,
  provider: FederatedProvider,
  name?: string,
): Promise<User> {
  const userIdentity = await findUserIdentity(providerId, provider);

  if (userIdentity) {
    const user = await findUserById(userIdentity.userId);
    return user!;
  }

  let user = await findUserByEmail(email);
  if (!user) {
    user = await addUser({
      id: uuid(),
      email,
      name,
    });
  }

  await addUserIdentity({
    providerId,
    provider,
    userId: user.id,
  });

  return user;
}
