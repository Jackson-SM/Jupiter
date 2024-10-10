import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { UserRepository } from '@src/domain/repositories/user-repository';

interface FindByEmailUseCaseRequest {
  email: string;
}
interface FindByEmailUseCaseResponse {
  user: User;
}

@Injectable()
export class FindByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: FindByEmailUseCaseRequest,
  ): Promise<FindByEmailUseCaseResponse> {
    const { email } = request;

    const user = await this.userRepository.findByEmail(email);

    return { user: user };
  }
}
