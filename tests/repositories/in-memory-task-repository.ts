import { Project } from "~/domain/entities/Project/Project";
import { Task } from "~/domain/entities/Task/Task";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

export class InMemoryProjectRepository implements TaskRepository {
  public tasks: Task[] = [];

  async findByid(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async findByProjectId(projectId: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.projectId === projectId);

    if (!task) {
      return null;
    }

    return task;
  }

  async findByResponsibleId(responsibleId: string): Promise<Task | null> {
    const task = this.tasks.find(
      (task) => task.responsibleId === responsibleId,
    );

    if (!task) {
      return null;
    }

    return task;
  }
  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
}
