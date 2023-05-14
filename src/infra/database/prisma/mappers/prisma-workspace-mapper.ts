import { Workspace as RawWorkspace } from "@prisma/client";
import { Workspace } from "../../../../domain/entities/Workspaces/Workspace";

export class PrismaWorkspaceMapper {
  static toDomain(workspace: RawWorkspace): Workspace {
    return new Workspace(
      {
        title: workspace.title,
        description: workspace.description,
        creatorId: workspace.creatorId,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
      },
      workspace.id,
    );
  }
  static toPrisma(workspace: Workspace): RawWorkspace {
    return {
      id: workspace.id,
      title: workspace.title,
      description: workspace.description,
      creatorId: workspace.creatorId,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
    };
  }
}
