import { Task } from "~/domain/entities/Task/Task";
import { TaskResponsible } from "~/domain/entities/TaskReponsible/TaskReponsible";
import { TaskRepository } from "~/domain/repositories/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = [];
  public taskResponsible: TaskResponsible[] = [];

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    const task = this.tasks.filter((task) => task.projectId === projectId);

    return task;
  }

  async findByResponsibleId(responsibleId: string): Promise<Task[]> {
    const taskRelation = this.taskResponsible
      .filter((task) => task.userId === responsibleId)
      .map((task) => task.taskId);

    const tasksResponsible = this.tasks.filter((task) =>
      taskRelation.includes(task.id),
    );
    return tasksResponsible;
  }
  async addResponsible(userId: string, taskId: string): Promise<void> {
    const task = new TaskResponsible({ userId, taskId });
    this.taskResponsible.push(task);
  }
  async removeTask(taskId: string): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === taskId);

    const arrayRemoves = this.tasks.slice(index, 1);

    this.tasks = arrayRemoves;
  }
  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
}
