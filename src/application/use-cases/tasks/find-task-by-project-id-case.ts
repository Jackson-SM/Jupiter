import Boom from "@hapi/boom";
import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface FindTaskByProjectIdCaseRequest {
  id: string;
}
interface FindTaskByProjectIdCaseResponse {
  tasks: Task[];
}

export class FindTaskByProjectIdCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: FindTaskByProjectIdCaseRequest,
  ): Promise<FindTaskByProjectIdCaseResponse> {
    const { id } = request;

    const tasks = await this.taskRepository.findByProjectId(id);

    return {
      tasks,
    };
  }
}
