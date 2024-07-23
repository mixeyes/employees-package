import Router from 'koa-router';
import { AuthenticateInput, User } from '../types';
import { generateAccessToken } from '../services/token-service';
import { accessMiddleware } from '../access-middleware';

export const router = new Router();

const bankingAccounts = [
  {
    userId: 'test-user-id',
    id: 'test-banking-account-id',
    value: 100,
    currency: 'USD',
  },
];

const users: User[] = [
  {
    id: 'test-user-id',
    email: 'test-user@gmail.com',
    password: 'test-password',
    createdAt: new Date(),
  },
];

router.post('/authenticate', async (ctx) => {
  const body: AuthenticateInput = ctx.request.body;
  const user = users.find((user) => user.email === body.email && user.password === body.password);
  if (!user) {
    ctx.throw(401, 'Incorrect password or email');
    return;
  }

  ctx.set('Content-Type', 'application/json');
  const accessToken = await generateAccessToken(user);
  ctx.body = JSON.stringify({ accessToken });
});

router.get('/banking-account', accessMiddleware, async (ctx) => {
  const user: User = ctx.state.user;
  const bankingAccount = bankingAccounts.find((bankingAccount) => bankingAccount.userId === user.id);
  if (!bankingAccount) {
    ctx.throw(404, 'Banking account not found');
    return;
  }

  ctx.set('Content-Type', 'application/json');
  ctx.body = JSON.stringify(bankingAccount);
});
