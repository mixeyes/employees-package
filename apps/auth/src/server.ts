import * as dotenv from 'dotenv';
dotenv.config();
import Koa from 'koa';
import { koaBody } from 'koa-body';
import grant from 'grant';
import session from 'koa-session';
import { router } from './routes';
import grantConfig from './grant-config';

const app = new Koa();
app.keys = ['grant'];

app.use(session(app));
app.use(koaBody());
app.use(grant.koa()(grantConfig));
app.use(router.routes());

app.on('error', (err) => {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
