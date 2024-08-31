import { User } from "~/domain/entities/User/User";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface FindAllResponsiblesTaskCaseRequest {
  id: string;
}
interface FindAllResponsiblesTaskCaseResponse {
  users: User[];
}

export class FindAllResponsiblesTaskCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: FindAllResponsiblesTaskCaseRequest,
  ): Promise<FindAllResponsiblesTaskCaseResponse> {
    const { id } = request;

    const users = await this.taskRepository.findAllResponsiblesTask(id);

    return {
      users,
    };
  }
}
