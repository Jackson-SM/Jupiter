import Boom from "@hapi/boom";
import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface FindTaskByIdCaseRequest {
  id: string;
}
interface FindTaskByIdCaseResponse {
  task: Task;
}

export class FindTaskByIdCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: FindTaskByIdCaseRequest,
  ): Promise<FindTaskByIdCaseResponse> {
    const { id } = request;

    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw Boom.notFound("Task not found");
    }

    return {
      task,
    };
  }
}
