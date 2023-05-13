import { Workspace } from "../../../domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "../../../domain/repositories/WorkspaceRepository";
import { WorkspaceNotFound } from "./errors/WorkspaceNotFound";

export class FindWorkspaceByIdCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(id: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findByid(id);

    if (!workspace) {
      throw new WorkspaceNotFound();
    }

    return workspace;
  }
}
