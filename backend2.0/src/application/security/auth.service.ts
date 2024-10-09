import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { UserRepository } from '@src/domain/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService implements AuthenticationRepository {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
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

    const token = await this.jwtService.sign(
      { email: user.email, id: user.id },
      '7d',
    );

    const userEntity = new User(user);

    return { user: userEntity, token };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.sign(
      { email: user.email, id: user.id },
      '7d',
    );

    const userEntity = new User(user);

    return { user: userEntity, token };
  }
}
