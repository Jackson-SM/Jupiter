import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

interface AddTaskResponsibleCaseRequest {
  userId: string;
  taskId: string;
}

export class AddTaskResponsibleCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(request: AddTaskResponsibleCaseRequest) {
    const { userId, taskId } = request;

    await this.taskRepository.addResponsible(userId, taskId);
  }
}
