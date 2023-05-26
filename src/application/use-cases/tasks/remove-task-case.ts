import { TaskRepository } from "~/domain/repositories/TaskRepository";

export class RemoveTaskCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.removeTask(taskId);
  }
}
