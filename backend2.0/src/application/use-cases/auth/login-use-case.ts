import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  token: string;
  user: User;
}

@Injectable()
export class LoginUseCase {
  constructor(private authenticationRepository: AuthenticationRepository) {}

  async execute(request: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const { email, password } = request;

    const { user, token } = await this.authenticationRepository.signIn(
      email,
      password,
    );

    return { user, token };
  }
}
