import { User } from "../../../domain/entities/User/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserAlreadyExists } from "./errors/UserAlreadyExists";
import { UserNotFound } from "./errors/UserNotFound";

interface FindUserByEmailRequest {
  email: string;
}

interface FindUserByEmailResponse {
  user: User;
}

export class FindUserByEmailCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: FindUserByEmailRequest,
  ): Promise<FindUserByEmailResponse> {
    const { email } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    return { user };
  }
}
