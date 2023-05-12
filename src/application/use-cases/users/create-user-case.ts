import { User } from "../../../domain/entities/User/User";
import { Password } from "../../../domain/entities/User/Password";
import { UserRepository } from "~/domain/repositories/UserRepository";

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: Password;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUserCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    const { firstName, lastName, email, password } = createUserRequest;

    const user = new User({
      firstName,
      lastName,
      email,
      password: password,
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
