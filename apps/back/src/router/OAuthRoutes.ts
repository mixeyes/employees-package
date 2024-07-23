import { Application } from 'express';
import { HttpStatusCodes } from '../constants/HttpStatusCodes';
import { authenticate } from '../services/federated-auth-service';
import { generateAccessToken } from '../services/token-service';
import { OauthProfile, FederatedProvider } from '../types';
import { IReq, IRes } from '../types/express';

export const authCallback = async (req: IReq, res: IRes) => {
  const profile: OauthProfile = req?.session?.grant.response?.profile;
  if (!profile) {
    return res.send('Unauthorized').status(HttpStatusCodes.UNAUTHORIZED).end();
  }

  try {
    const user = await authenticate(
      profile.sub,
      profile.email,
      FederatedProvider.GOOGLE,
      profile.given_name || profile.name,
    );

    const accessToken = await generateAccessToken(user);
    return res.json({ accessToken }).status(HttpStatusCodes.ACCEPTED).end();
  } catch (err) {
    console.error({ err });
    return res.send('Unauthorized').status(HttpStatusCodes.UNAUTHORIZED).end();
  }
};
