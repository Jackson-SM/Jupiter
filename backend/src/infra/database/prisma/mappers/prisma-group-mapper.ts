import { Group as RawGroup } from "@prisma/client";
import { Group } from "../../../../domain/entities/Group/Group";

export class PrismaGroupMapper {
  static toDomain(group: RawGroup): Group {
    return new Group(
      {
        name: group.name,
        projectId: group.projectId,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
      },
      group.id,
    );
  }

  static toPrisma(group: Group): RawGroup {
    return {
      id: group.id,
      name: group.name,
      projectId: group.projectId,
      createdAt: group.createdAt,
      updatedAt: group.createdAt,
    };
  }
}
