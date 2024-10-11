import { NotFoundException } from '@nestjs/common';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';
import { makeWorkspace } from '@test/factory/workspace-factory';
import { InMemoryWorkspaceRepository } from '@test/repositories/in-memory-workspace-repository';
import { DeleteWorkspaceUseCase } from './delete-workspace-use-case';

describe('Delete Workspace Use Case', () => {
  let deleteWorkspaceUseCase: DeleteWorkspaceUseCase;
  let workspaceRepository: WorkspaceRepository;

  beforeEach(() => {
    workspaceRepository = new InMemoryWorkspaceRepository();
    deleteWorkspaceUseCase = new DeleteWorkspaceUseCase(workspaceRepository);
  });

  it('should delete a workspace', async () => {
    const workspace = makeWorkspace();

    await workspaceRepository.save(workspace);
    await deleteWorkspaceUseCase.execute({ id: workspace.id });

    await expect(workspaceRepository.findById(workspace.id)).rejects.toThrow(
      new NotFoundException('Workspace not found'),
    );
  });

  it('should not delete a workspace if it does not exist', async () => {
    const workspace = makeWorkspace();

    await expect(
      deleteWorkspaceUseCase.execute({ id: workspace.id }),
    ).rejects.toThrow(new NotFoundException('Workspace doesnt exist'));
  });
});
