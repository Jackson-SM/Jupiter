import { Workspace } from "../../../domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "~/domain/repositories/WorkspaceRepository";

export class CreateWorkspaceCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(workspace: Workspace): Promise<void> {
    const user = await this.workspaceRepository.create(workspace);
  }
}
