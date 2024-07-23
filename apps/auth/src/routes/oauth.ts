import Router from 'koa-router';
import { authenticate } from '../services/federated-auth-service';
import { generateAccessToken } from '../services/token-service';
import { OauthProfile, FederatedProvider } from '../types';

export const router = new Router();

router.all('/:provider/callback', async (ctx) => {
  const profile: OauthProfile = ctx.state?.grant?.response?.profile;
  if (!profile) {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
    return;
  }

  try {
    const user = await authenticate(
      profile.sub,
      profile.email,
      FederatedProvider.GOOGLE,
      profile.given_name || profile.name,
    );

    const accessToken = await generateAccessToken(user);
    ctx.status = 200;
    ctx.body = JSON.stringify({ accessToken });
  } catch (err) {
    console.error({ err });
    ctx.status = 401;
    ctx.body = 'Unauthorized';
  }
});
