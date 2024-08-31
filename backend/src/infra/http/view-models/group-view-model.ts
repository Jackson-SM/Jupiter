import { Group } from "~/domain/entities/Group/Group";

export class GroupViewModel {
  static toHttp(group: Group) {
    return {
      id: group.id,
      name: group.name,
      projectId: group.projectId,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    };
  }
}
