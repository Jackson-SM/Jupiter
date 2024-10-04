import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities/user';
import { UserRepository } from '@src/domain/repositories/user-repository';

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, firstName, lastName, password } = request;

    const user = new User({ email, firstName, lastName, password });

    const userCreated = await this.userRepository.save(user);

    return { user: userCreated };
  }
}
