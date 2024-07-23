import Router from 'express';
// import { router as apiRouter } from './api';
import { router as oauthRouter } from './oauth';

export const router = Router();

// router.use('/api', apiRouter.routes());
router.use('/oauth', oauthRouter.routes());
