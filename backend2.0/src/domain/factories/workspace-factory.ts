import { Workspace } from '../entities/workspace';

export class WorkspaceFactory {
  static create(workspace: Workspace) {
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
}
