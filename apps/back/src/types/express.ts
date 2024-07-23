import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { GrantHandlerResult } from 'grant';

interface AppSession extends Session {
  grant: GrantHandlerResult;
}

export interface IReq<T = void> extends Request {
  body: T;
  session: AppSession & Partial<SessionData>;
}

export interface IRes extends Response {
  locals: Record<string, unknown>;
}
