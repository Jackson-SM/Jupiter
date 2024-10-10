import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';

export interface SignInUseCaseRequest {
  email: string;
  password: string;
}

export interface SignInUseCaseResponse {
  token: string;
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private authenticationRepository: AuthenticationRepository) {}

  async execute(request: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const { email, password } = request;

    const { user, token } = await this.authenticationRepository.signIn(
      email,
      password,
    );

    if (user.disabled) {
      throw new UnauthorizedException('User is disabled');
    }

    return { user, token };
  }
}
