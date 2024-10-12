import { Workspace as PrismaWorkspace } from '@prisma/client';
import { Workspace } from '@src/domain/entities/workspace';

export class PrismaWorkspaceMapper {
  static toDomain(workspace: PrismaWorkspace): Workspace {
    return new Workspace(
      {
        title: workspace.title,
        ownerId: workspace.ownerId,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
      },
      workspace.id,
    );
  }

  static toPrisma(workspace: Workspace): PrismaWorkspace {
    return {
      id: workspace.id,
      title: workspace.title,
      ownerId: workspace.ownerId,
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
    };
  }
}
