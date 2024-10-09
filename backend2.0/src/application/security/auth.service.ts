import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { ServiceTokenRepository } from '@src/domain/repositories/service-token-repository';
import { UserRepository } from '@src/domain/repositories/user-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthenticationRepository {
  constructor(
    private userRepository: UserRepository,
    private serviceToken: ServiceTokenRepository,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.serviceToken.sign(
      { email: user.email, id: user.id },
      '7d',
    );

    const userEntity = new User(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        disabled: user.disabled,
      },
      user.id,
    );

    return { user: userEntity, token };
  }
}
