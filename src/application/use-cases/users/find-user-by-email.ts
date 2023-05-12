import { UserRepository } from "~/domain/repositories/UserRepository";
import { UserNotFound } from "./errors/UserNotFound";
import { User } from "~/domain/entities/User/User";

interface FindUserByEmailRequest {
  email: string;
}

interface FindUserByEmailResponse {
  user: User;
}

export class FindUserByIdCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: FindUserByEmailRequest,
  ): Promise<FindUserByEmailResponse> {
    const { email } = request;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFound();
    }

    return {
      user,
    };
  }
}
