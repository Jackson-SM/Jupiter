import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface FindTaskByResponsibleIdCaseRequest {
  id: string;
}
interface FindTaskByResponsibleIdCaseResponse {
  tasks: Task[];
}

export class FindTaskByResponsibleIdCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: FindTaskByResponsibleIdCaseRequest,
  ): Promise<FindTaskByResponsibleIdCaseResponse> {
    const { id } = request;

    const tasks = await this.taskRepository.findByResponsibleId(id);

    return {
      tasks,
    };
  }
}
