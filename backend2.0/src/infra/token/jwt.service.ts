import { Injectable } from '@nestjs/common';
import { Payload } from '@src/application/types/Payload';
import { TokenProviderRepository } from '@src/domain/repositories/token-provider-repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService implements TokenProviderRepository {
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
