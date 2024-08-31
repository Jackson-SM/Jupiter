import { Workspace } from "~/domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "~/domain/repositories/WorkspaceRepository";

interface GetAllWorkspacesByCreatorIdCaseRequest {
  creatorId: string;
}

interface GetAllWorkspacesByCreatorIdCaseResponse {
  workspaces: Workspace[];
}

export class GetAllWorkspacesByCreatorIdCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(
    request: GetAllWorkspacesByCreatorIdCaseRequest,
  ): Promise<GetAllWorkspacesByCreatorIdCaseResponse> {
    const { creatorId } = request;
    const workspaces = await this.workspaceRepository.getAllByCreatorId(
      creatorId,
    );

    return {
      workspaces,
    };
  }
}
