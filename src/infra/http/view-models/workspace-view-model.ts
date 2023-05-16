import { Workspace } from "../../../domain/entities/Workspaces/Workspace";

export class WorkspaceViewModel {
  static async toHttp(workspace: Workspace) {
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
