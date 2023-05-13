import { Workspace } from "../entities/Workspaces/Workspace";

export interface WorkspaceRepository {
  create(workspace: Workspace): Promise<void>;
}
