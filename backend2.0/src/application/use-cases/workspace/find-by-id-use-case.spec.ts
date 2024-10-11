import { NotFoundException } from '@nestjs/common';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';
import { makeWorkspace } from '@test/factory/workspace-factory';
import { InMemoryWorkspaceRepository } from '@test/repositories/in-memory-workspace-repository';
import { FindByIdUseCase } from './find-by-id-use-case';

describe('Find By Id Use Case', () => {
  let findByIdUseCase: FindByIdUseCase;
  let workspaceRepository: WorkspaceRepository;

  beforeEach(() => {
    workspaceRepository = new InMemoryWorkspaceRepository();
    findByIdUseCase = new FindByIdUseCase(workspaceRepository);
  });

  it('should find a workspace by id', async () => {
    const workspace = makeWorkspace();

    await workspaceRepository.save(workspace);

    const { workspace: foundWorkspace } = await findByIdUseCase.execute({
      id: workspace.id,
    });

    expect(foundWorkspace).toEqual(workspace);
  });

  it('should not find a workspace if it does not exist', async () => {
    await expect(findByIdUseCase.execute({ id: 'invalid-id' })).rejects.toThrow(
      new NotFoundException('Workspace not found'),
    );
  });
});
