import { Workspace } from '@src/domain/entities/workspace';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';

interface CreateWorkspaceRequest {
  title: string;
}
interface CreateWorkspaceResponse {
  workspace: Workspace;
}

export class CreateWorkspace {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(
    request: CreateWorkspaceRequest,
  ): Promise<CreateWorkspaceResponse> {
    const workspace = new Workspace({
      title: request.title,
    });

    const savedWorkspace = await this.workspaceRepository.save(workspace);

    return { workspace: savedWorkspace };
  }
}
