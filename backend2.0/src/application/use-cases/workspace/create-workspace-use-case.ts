import { Injectable } from '@nestjs/common';
import { Workspace } from '@src/domain/entities/workspace';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';

interface CreateWorkspaceUseCaseRequest {
  title: string;
  ownerId: string;
}
interface CreateWorkspaceUseCaseResponse {
  workspace: Workspace;
}

@Injectable()
export class CreateWorkspaceUseCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(
    request: CreateWorkspaceUseCaseRequest,
  ): Promise<CreateWorkspaceUseCaseResponse> {
    const workspace = new Workspace({
      title: request.title,
      ownerId: request.ownerId,
    });

    const savedWorkspace = await this.workspaceRepository.save(workspace);

    return { workspace: savedWorkspace };
  }
}
