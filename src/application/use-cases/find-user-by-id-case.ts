import { User } from "@application/entities/User";
import { UserRepository } from "@application/repositories/UserRepository";

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
      throw new Error("Notification Not Found");
    }

    return {
      user,
    };
  }
}
