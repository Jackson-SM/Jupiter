import { WorkspaceRepository } from "~/domain/repositories/WorkspaceRepository";

export class RemoveWorkspaceCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(workspaceId: string): Promise<void> {
    await this.workspaceRepository.removeWorkspace(workspaceId);
  }
}
