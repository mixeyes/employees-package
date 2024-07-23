import { Maybe, FederatedIdentity, FederatedProvider } from '../types';
import { db } from './db';

export async function findUserIdentity(
  providerId: string,
  provider: FederatedProvider,
): Promise<Maybe<FederatedIdentity>> {
  const result = await db<FederatedIdentity>('federated_identity')
    .where({
      providerId,
      provider,
    })
    .first();
  return result;
}

export async function addUserIdentity(userIdentity: Omit<FederatedIdentity, 'createdAt'>): Promise<FederatedIdentity> {
  const [result] = await db<FederatedIdentity>('federated_identity').insert(userIdentity, '*');
  return result;
}
