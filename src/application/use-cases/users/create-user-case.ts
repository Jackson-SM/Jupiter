import { User } from "../../../domain/entities/User/User";
import { Password } from "../../../domain/entities/User/Password";
import { UserRepository } from "~/domain/repositories/UserRepository";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import bcrypt from "bcrypt";

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

    const passwordHash = await bcrypt.hash(password.value, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: new Password(passwordHash),
    });

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new UserAlreadyExists();
    }

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
