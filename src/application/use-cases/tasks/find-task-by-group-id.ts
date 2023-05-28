import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface FindTaskByGroupIdCaseRequest {
  id: string;
}
interface FindTaskByGroupIdCaseResponse {
  task: Task[];
}

export class FindTaskByGroupId {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: FindTaskByGroupIdCaseRequest,
  ): Promise<FindTaskByGroupIdCaseResponse> {
    const { id } = request;

    const task = await this.taskRepository.findTasksByGroupId(id);

    return {
      task,
    };
  }
}
