import { Task } from "../entities/Task/Task";

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  findByResponsibleId(responsibleId: string): Promise<Task[]>;
  addResponsible(userId: string, taskId: string): Promise<void>;
  removeTask(taskId: string): Promise<void>;
}
