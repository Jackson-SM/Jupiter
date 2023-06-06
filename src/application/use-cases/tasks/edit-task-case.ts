import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface EditTaskCaseRequest {
  taskId: string;
  title?: string;
  description?: string;
}

export class EditTaskCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: EditTaskCaseRequest): Promise<void> {
    const { taskId, title, description } = request;

    await this.taskRepository.editTask(taskId, title, description);
  }
}
