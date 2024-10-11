import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserFactory } from '@src/domain/factories/user-factory';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { TokenProviderRepository } from '@src/domain/repositories/token-provider-repository';
import { UserRepository } from '@src/domain/repositories/user-repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthenticationRepository {
  constructor(
    private userRepository: UserRepository,
    private serviceToken: TokenProviderRepository,
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
      `${process.env.JWT_EXPIRES_IN || '7d'}`,
    );

    const userEntity = UserFactory.create(user);

    return { user: userEntity, token };
  }
}
