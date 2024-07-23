export type Maybe<T> = T | null | undefined;

export interface AuthenticateInput {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  password?: string;
  createdAt: Date;
}

export interface OauthProfile {
  sub: string;
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
}

export interface FederatedIdentity {
  userId: string;
  providerId: string;
  provider: FederatedProvider;
  createdAt: Date;
}

export enum FederatedProvider {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
}
