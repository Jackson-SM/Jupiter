import Boom from "@hapi/boom";
import { User } from "../../../domain/entities/User/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

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
      throw Boom.notFound("User not found");
    }

    return { user };
  }
}
