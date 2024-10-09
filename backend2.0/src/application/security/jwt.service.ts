import { Injectable } from '@nestjs/common';
import { ServiceTokenRepository } from '@src/domain/repositories/service-token-repository';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../types/Payload';

@Injectable()
export class JwtService implements ServiceTokenRepository {
  async sign(payload: Payload, expiresIn: string): Promise<string> {
    const token = jwt.sign(payload, `${process.env.JWT_KEY}`, {
      expiresIn: `${expiresIn}`,
    });

    return token;
  }

  async verify(token: string): Promise<Payload> {
    const payload = (await jwt.verify(
      token,
      `${process.env.JWT_KEY}`,
    )) as Payload;

    return payload;
  }
}
