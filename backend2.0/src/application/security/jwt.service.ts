import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Payload } from '../types/Payload';

@Injectable()
export class JwtService {
  async sign(payload: Payload, expiresIn: string): Promise<string> {
    return jwt.sign(payload, `${process.env.JWT_SECRET}`, {
      expiresIn: `${expiresIn}`,
    });
  }
}
