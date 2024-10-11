import { Injectable } from '@nestjs/common';
import { Workspace } from '@src/domain/entities/workspace';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';

export interface FindByIdUseCaseRequest {
  id: string;
}

export interface FindByIdUseCaseResponse {
  workspace: Workspace;
}

@Injectable()
export class FindByIdUseCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(
    request: FindByIdUseCaseRequest,
  ): Promise<FindByIdUseCaseResponse> {
    const { id } = request;

    const workspace = await this.workspaceRepository.findById(id);

    return { workspace };
  }
}
