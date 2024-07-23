import Router, { RequestHandler } from 'express';
import { authCallback } from './OAuthRoutes';

export const router = Router();

router.get('/:provider/callback', authCallback as RequestHandler);
