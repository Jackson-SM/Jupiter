import { Workspace } from "~/domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "~/domain/repositories/WorkspaceRepository";

export class InMemoryWorkspaceRepository implements WorkspaceRepository {
  public workspaces: Workspace[] = [];

  async create(workspace: Workspace): Promise<void> {
    this.workspaces.push(workspace);
  }
}
