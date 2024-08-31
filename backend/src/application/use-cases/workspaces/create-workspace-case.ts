import { Workspace } from "../../../domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "~/domain/repositories/WorkspaceRepository";

interface CreateWorkspaceRequest {
  title: string;
  description: string;
  creatorId: string;
}

interface CreateWorkspaceResponse {
  workspace: Workspace;
}

export class CreateWorkspaceCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(
    createWorkspaceRequest: CreateWorkspaceRequest,
  ): Promise<CreateWorkspaceResponse> {
    const { title, description, creatorId } = createWorkspaceRequest;

    const workspace = new Workspace({ title, description, creatorId });

    await this.workspaceRepository.create(workspace);

    return {
      workspace,
    };
  }
}
