import { UserRepository } from "~/domain/repositories/UserRepository";
import { UserNotFound } from "./errors/UserNotFound";
import { User } from "~/domain/entities/User";

interface FindUserByIdRequest {
  id: string;
}

interface FindUserByIdResponse {
  user: User;
}

export class FindUserByIdCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    const { id } = request;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    return {
      user,
    };
  }
}
