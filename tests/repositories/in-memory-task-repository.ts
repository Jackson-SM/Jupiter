import { User } from "~/domain/entities/User/User";
import { Task } from "../../src/domain/entities/Task/Task";
import { TaskResponsible } from "../../src/domain/entities/TaskReponsible/TaskReponsible";
import { TaskRepository } from "../../src/domain/repositories/TaskRepository";
import { UserRepository } from "~/domain/repositories/UserRepository";

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = [];
  public taskResponsible: TaskResponsible[] = [];

  constructor(private userRepository?: UserRepository) {}

  async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async findTasksByGroupId(groupId: string): Promise<Task[]> {
    const taskByGroupId = this.tasks.filter((task) => task.groupId === groupId);

    return taskByGroupId;
  }

  async doneTask(taskId: string): Promise<void> {
    await this.tasks.map((task) => {
      if (task.id === taskId) {
        task.doneDate = new Date();
      }
      return task;
    });
  }

  async editTask(
    taskId: string,
    title?: string | undefined,
    description?: string | undefined,
  ): Promise<void> {
    const taskEdit = this.tasks.map((task) => {
      if (task.id === taskId) {
        task.title = title ?? task.title;
        task.description = description ?? task.description;
      }

      return task;
    });

    this.tasks = taskEdit;
  }

  async findAllResponsiblesTask(taskId: string): Promise<User[]> {
    const responsiblesTask = this.taskResponsible
      .filter((responsible) => responsible.taskId === taskId)
      .map((responsible) => responsible.userId);
    const userFilter = responsiblesTask.map((responsible) =>
      this.userRepository!.findById(responsible),
    );
    const users = await Promise.all(userFilter);
    return users.filter((user) => user !== null) as User[];
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

  async moveTaskGroup(newGroup: string, taskId: string): Promise<void> {
    this.tasks.map((task) => {
      if (task.id === taskId) {
        task.groupId = newGroup;
      }
    });
  }

  async removeResponsible(userId: string, taskId: string): Promise<void> {
    const responsibleRemoved = this.taskResponsible.filter(
      (responsible) =>
        responsible.userId !== userId || responsible.taskId !== taskId,
    );

    this.taskResponsible = responsibleRemoved;
  }

  async addResponsible(userId: string, taskId: string): Promise<void> {
    const task = new TaskResponsible({ userId, taskId });
    this.taskResponsible.push(task);
  }
  async removeTask(taskId: string): Promise<void> {
    const arrayRemoves = this.tasks.filter((task) => task.id !== taskId);

    this.tasks = arrayRemoves;
  }
  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
}
