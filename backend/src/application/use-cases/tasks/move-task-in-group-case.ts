import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface MoveTaskInGroupCaseRequest {
  taskId: string;
  newGroup: string;
}

export class MoveTaskInGroupCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: MoveTaskInGroupCaseRequest): Promise<void> {
    const { taskId, newGroup } = request;

    await this.taskRepository.moveTaskGroup(newGroup, taskId);
  }
}
