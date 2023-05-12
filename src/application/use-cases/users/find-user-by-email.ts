import { UserRepository } from "~/domain/repositories/UserRepository";
import { UserNotFound } from "./errors/UserNotFound";
import { User } from "~/domain/entities/User/User";

interface FindUserByIdRequest {
  email: string;
}

interface FindUserByIdResponse {
  user: User;
}

export class FindUserByIdCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    const { email } = request;

    const user = await this.userRepository.findById(email);

    if (!user) {
      throw new UserNotFound();
    }

    return {
      user,
    };
  }
}
