import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@src/application/types/Payload';
import { AuthRepositoryTokenReturn } from '@src/domain/interfaces/auth-repository-token-return';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { UserRepository } from '@src/domain/repositories/user-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthenticationRepository {
  constructor(
    private userService: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<AuthRepositoryTokenReturn> {
    const user = await this.userService.findByEmail(email);

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: Payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
      }),
      user: user,
    };
  }
}
