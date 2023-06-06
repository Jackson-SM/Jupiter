import { TaskRepository } from "~/domain/repositories/TaskRepository";
import { Group } from "../../src/domain/entities/Group/Group";
import { GroupRepository } from "../../src/domain/repositories/GroupRepository";

export class InMemoryGroupRepository implements GroupRepository {
  public groups: Group[] = [];

  constructor(private taskRepository?: TaskRepository) {}

  async createGroup(group: Group): Promise<void> {
    await this.groups.push(group);
  }
  async deleteGroup(groupId: string): Promise<void> {
    const groupDeleted = await this.groups.filter(
      (group) => group.id !== groupId,
    );
    this.groups = groupDeleted;
  }
  async editNameGroup(groupId: string, name: string): Promise<void> {
    const groupEdit = await this.groups.map((groupOld) => {
      if (groupOld.id === groupId) {
        groupOld.name = name;
      }
      return groupOld;
    });
    this.groups = groupEdit;
  }
  async findAllGroupsByProject(projectId: string): Promise<Group[]> {
    const groupsByProject = await this.groups.filter(
      (group) => group.projectId === projectId,
    );

    return groupsByProject;
  }
}
