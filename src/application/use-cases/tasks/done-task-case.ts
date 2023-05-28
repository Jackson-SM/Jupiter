import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface DoneTaskCaseRequest {
  id: string;
}

export class DoneTaskCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: DoneTaskCaseRequest): Promise<void> {
    const { id } = request;

    await this.taskRepository.doneTask(id);
  }
}
