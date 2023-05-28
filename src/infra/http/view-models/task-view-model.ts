import { Task } from "~/domain/entities/Task/Task";

export class TaskViewModel {
  static toHttp(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      groupId: task.groupId,
      doneDate: task.doneDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
