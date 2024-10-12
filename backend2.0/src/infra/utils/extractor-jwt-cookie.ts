import { Request } from 'express';

export function extractorJwtCookie(request: Request) {
  let token = null;

  if (request && request.cookies) {
    token = request.cookies['access_token'];
  }

  return token;
}
