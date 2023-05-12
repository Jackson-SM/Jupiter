import { User } from "../../../domain/entities/User/User";
import { Password } from "../../../domain/entities/User/Password";
import { UserRepository } from "~/domain/repositories/UserRepository";
import bcrypt from "bcrypt";

interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: new Password(passwordHash),
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
