import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  token: string;
}

@Injectable()
export class LoginUseCase {
  constructor(private authenticationRepository: AuthenticationRepository) {}

  async execute(request: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const { email, password } = request;

    const token = await this.authenticationRepository.signIn(email, password);

    return { token };
  }
}
