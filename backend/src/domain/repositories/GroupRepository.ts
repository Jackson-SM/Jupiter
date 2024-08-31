import { Group } from "../entities/Group/Group";

export interface GroupRepository {
  createGroup(group: Group): Promise<void>;
  deleteGroup(groupId: string): Promise<void>;
  editNameGroup(groupId: string, name: string): Promise<void>;
  findAllGroupsByProject(projectId: string): Promise<Group[]>;
}
