import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';

interface DeleteWorkspaceUseCaseRequest {
  id: string;
}

@Injectable()
export class DeleteWorkspaceUseCase {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async execute(request: DeleteWorkspaceUseCaseRequest): Promise<void> {
    const { id } = request;

    await this.workspaceRepository.delete(id);
  }
}
