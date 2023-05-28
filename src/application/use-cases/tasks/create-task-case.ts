import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface CreateTaskCaseRequest {
  title: string;
  description: string;
  projectId: string;
  groupId: string;
}
interface CreateTaskCaseResponse {
  task: Task;
}

export class CreateTaskCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    request: CreateTaskCaseRequest,
  ): Promise<CreateTaskCaseResponse> {
    const { title, description, projectId, groupId } = request;

    const task = new Task({ title, description, projectId, groupId });

    await this.taskRepository.create(task);

    return {
      task,
    };
  }
}
