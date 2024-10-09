import { Injectable } from '@nestjs/common';
import { User } from '@src/domain/entities/user';
import { UserRepository } from '@src/domain/repositories/user-repository';
import * as bcrypt from 'bcrypt';

interface SignUpUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface SignUpUserResponse {
  user: User;
}

@Injectable()
export class SignUpUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: SignUpUserRequest): Promise<SignUpUserResponse> {
    const { email, firstName, lastName, password } = request;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      firstName,
      lastName,
      password: passwordHash,
    });

    const userCreated = await this.userRepository.save(user);

    return { user: userCreated };
  }
}
