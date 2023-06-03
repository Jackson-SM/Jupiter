import { Group } from "../../src/domain/entities/Group/Group";
import { TasksInGroup } from "../../src/domain/entities/TasksInGroup/TasksInGroup";
import { GroupRepository } from "../../src/domain/repositories/GroupRepository";

export class InMemoryGroupRepository implements GroupRepository {
  public groups: Group[] = [];
  public tasksInGroup: TasksInGroup[] = [];
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
  async addTaskInGroup(taskId: string, groupId: string): Promise<void> {
    const taskInGroup = new TasksInGroup({ groupId: groupId, taskId: taskId });
    await this.tasksInGroup.push(taskInGroup);
  }
  async moveTaskGroup(newGroup: string, taskId: string): Promise<void> {
    const editGroup = await this.tasksInGroup.map((task) => {
      if (task.taskId === taskId) {
        task.groupId = newGroup;
      }
      return task;
    });

    this.tasksInGroup = editGroup;
  }
  async findAllGroupsByProject(projectId: string): Promise<Group[]> {
    const groupsByProject = await this.groups.filter(
      (group) => group.projectId === projectId,
    );

    return groupsByProject;
  }
}
