import { Workspace } from "~/domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "~/domain/repositories/WorkspaceRepository";

export class InMemoryWorkspaceRepository implements WorkspaceRepository {
  public workspaces: Workspace[] = [];

  async findByid(id: string): Promise<Workspace | null> {
    const user = await this.workspaces.find((workspace) => workspace.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
  async getAllByCreatorId(creatorId: string): Promise<Workspace[]> {
    const workspace = this.workspaces.filter(
      (workspace) => workspace.creatorId === creatorId,
    );

    return workspace;
  }

  async removeWorkspace(workspaceId: string): Promise<void> {
    const index = this.workspaces.findIndex(
      (workspace) => workspace.id === workspaceId,
    );

    const arrayRemoves = this.workspaces.slice(index, 1);

    this.workspaces = arrayRemoves;
  }

  async create(workspace: Workspace): Promise<void> {
    this.workspaces.push(workspace);
  }
}
