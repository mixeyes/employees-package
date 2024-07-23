import Router from 'koa-router';
import { router as apiRouter } from './api';
import { router as oauthRouter } from './oauth';

export const router = new Router();

router.use('/api', apiRouter.routes());
router.use('/oauth', oauthRouter.routes());
