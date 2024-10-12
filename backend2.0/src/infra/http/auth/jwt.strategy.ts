import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from '@src/application/types/Payload';
import { extractorJwtCookie } from '@src/infra/utils/extractor-jwt-cookie';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractorJwtCookie]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: Payload) {
    return { id: payload.id, email: payload.email };
  }
}
