import { UserRepository } from "~/domain/repositories/UserRepository";
import { User } from "~/domain/entities/User/User";
import Boom from "@hapi/boom";

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
      throw Boom.notFound("User not found");
    }

    return {
      user,
    };
  }
}
