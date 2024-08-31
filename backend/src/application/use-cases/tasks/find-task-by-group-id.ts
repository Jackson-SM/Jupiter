import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface FindTaskByGroupIdCaseRequest {
  id: string;
}
interface FindTaskByGroupIdCaseResponse {
  tasks: Task[];
}

export class FindTaskByGroupIdCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: FindTaskByGroupIdCaseRequest,
  ): Promise<FindTaskByGroupIdCaseResponse> {
    const { id } = request;

    const tasks = await this.taskRepository.findTasksByGroupId(id);

    return {
      tasks,
    };
  }
}
