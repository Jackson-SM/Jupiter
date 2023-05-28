import { Group } from "../entities/Group/Group";

export interface GroupRepository {
  createGroup(group: Group): Promise<void>;
  deleteGroup(groupId: string): Promise<void>;
  editGroup(groupId: string, group: Group): Promise<void>;
  addTaskInGroup(taskId: string, groupId: string): Promise<void>;
  moveTaskGroup(
    newGroup: string,
    currentGroup: string,
    taskId: string,
  ): Promise<void>;
  removeTaskInGroup(taskId: string, groupId: string): Promise<void>;
  findAllGroupsByProject(): Promise<Group[]>;
}
