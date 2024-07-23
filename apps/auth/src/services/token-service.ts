import * as jwt from 'jsonwebtoken';
import { User } from '../types';

const accessTokenSalt = 'very-secret-salt';
const tokenExpiresIn = '1h';

async function generateToken(payload: Object, salt: string, options: jwt.SignOptions): Promise<string> {
  return new Promise((res, rej) => {
    jwt.sign(payload, salt, options, (err, token) => {
      if (err) {
        return rej(err);
      }
      res(token!);
    });
  });
}

async function verifyToken(token: string, salt: string): Promise<jwt.JwtPayload> {
  return new Promise((res, rej) => {
    jwt.verify(token, salt, (err, decoded: jwt.JwtPayload) => {
      if (err) {
        return rej(err);
      }
      res(decoded);
    });
  });
}

export function generateAccessToken(user: User): Promise<string> {
  return generateToken({ id: user.id, email: user.email }, accessTokenSalt, {
    expiresIn: tokenExpiresIn,
  });
}

export function verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
  return verifyToken(token, accessTokenSalt);
}
