import { Task } from "~/domain/entities/Task/Task";

export class TaskViewModel {
  static toHttp(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      projectId: task.projectId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
