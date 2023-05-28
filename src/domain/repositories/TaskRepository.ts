import { Task } from "../entities/Task/Task";

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByResponsibleId(responsibleId: string): Promise<Task[]>;
  findTasksByGroupId(groupId: string): Promise<Task[]>;
  addResponsible(userId: string, taskId: string): Promise<void>;
  doneTask(taskId: string): Promise<void>;
  removeTask(taskId: string): Promise<void>;
}
