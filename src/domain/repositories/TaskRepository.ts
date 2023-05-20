import { Task } from "../entities/Task/Task";

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findByid(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  findByResponsibleId(responsibleId: string): Promise<Task[]>;
}
