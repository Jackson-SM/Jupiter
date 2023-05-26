import { WorkspaceRepository } from "~/domain/repositories/WorkspaceRepository";

export class CreateWorkspaceCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(workspaceId: string): Promise<void> {
    await this.workspaceRepository.removeWorkspace(workspaceId);
  }
}
