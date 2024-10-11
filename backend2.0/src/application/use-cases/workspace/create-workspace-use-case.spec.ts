import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';
import { makeWorkspace } from '@test/factory/workspace-factory';
import { InMemoryWorkspaceRepository } from '@test/repositories/in-memory-workspace-repository';
import { CreateWorkspaceUseCase } from './create-workspace-use-case';

describe('Create Workspace Use Case', () => {
  let createWorkspaceUseCase: CreateWorkspaceUseCase;
  let workspaceRepository: WorkspaceRepository;

  beforeEach(() => {
    workspaceRepository = new InMemoryWorkspaceRepository();
    createWorkspaceUseCase = new CreateWorkspaceUseCase(workspaceRepository);
  });

  it('should create a workspace', async () => {
    const { workspace } = await createWorkspaceUseCase.execute(makeWorkspace());

    expect(workspace).toBeDefined();
    expect(await workspaceRepository.findById(workspace.id)).toEqual(workspace);
  });
});
