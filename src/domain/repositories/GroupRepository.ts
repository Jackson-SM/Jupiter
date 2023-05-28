import { Group } from "../entities/Group/Group";

export interface GroupRepository {
  createGroup(group: Group): Promise<void>;
  deleteGroup(groupId: string): Promise<void>;
  editNameGroup(groupId: string, name: string): Promise<void>;
  addTaskInGroup(taskId: string, groupId: string): Promise<void>;
  moveTaskGroup(newGroup: string, taskId: string): Promise<void>;
  removeTaskInGroup(taskId: string, groupId: string): Promise<void>;
  findAllGroupsByProject(projectId: string): Promise<Group[]>;
}
