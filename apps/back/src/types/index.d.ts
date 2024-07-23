import 'express';
import 'express-session';
import { GrantHandlerResult } from 'grant';

// **** Declaration Merging **** //

declare module 'express' {
  export interface Request {
    signedCookies: Record<string, string>;
  }
}

declare module 'express-session' {
  export interface SessionData {
    grant?: GrantHandlerResult;
  }
}
