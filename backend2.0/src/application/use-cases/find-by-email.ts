import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities/User';
import { UserRepository } from '@src/domain/repositories/user-repository';

interface FindByEmailRequest {
  email: string;
}
interface FindByEmailResponse {
  user: User;
}

@Injectable()
export class FindByEmail {
  constructor(private userRepository: UserRepository) {}

  async execute(request: FindByEmailRequest): Promise<FindByEmailResponse> {
    const { email } = request;

    const user = await this.userRepository.findByEmail(email);

    return { user: user };
  }
}
