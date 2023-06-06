import { Task } from "../entities/Task/Task";
import { User } from "../entities/User/User";

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByResponsibleId(responsibleId: string): Promise<Task[]>;
  findTasksByGroupId(groupId: string): Promise<Task[]>;
  findAllResponsiblesTask(taskId: string): Promise<User[]>;
  addResponsible(userId: string, taskId: string): Promise<void>;
  moveTaskGroup(newGroup: string, taskId: string): Promise<void>;
  editTask(taskId: string, title?: string, description?: string): Promise<void>;
  doneTask(taskId: string): Promise<void>;
  removeTask(taskId: string): Promise<void>;
}
