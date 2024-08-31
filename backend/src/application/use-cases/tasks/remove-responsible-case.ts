import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface RemoveResponsibleCaseRequest {
  taskId: string;
  userId: string;
}

export class RemoveResponsibleCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: RemoveResponsibleCaseRequest): Promise<void> {
    const { taskId, userId } = request;

    await this.taskRepository.removeResponsible(userId, taskId);
  }
}
