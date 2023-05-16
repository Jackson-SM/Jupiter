import { Workspace } from "../../../domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "../../../domain/repositories/WorkspaceRepository";
import { WorkspaceNotFound } from "./errors/WorkspaceNotFound";

interface FindWorkspaceRequest {
  id: string;
}

interface FindWorkspaceResponse {
  workspace: Workspace;
}

export class FindWorkspaceByIdCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(request: FindWorkspaceRequest): Promise<FindWorkspaceResponse> {
    const { id } = request;

    const workspace = await this.workspaceRepository.findByid(id);

    if (!workspace) {
      throw new WorkspaceNotFound();
    }

    return {
      workspace,
    };
  }
}
