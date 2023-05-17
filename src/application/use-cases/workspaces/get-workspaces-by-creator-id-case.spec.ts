import { InMemoryWorkspaceRepository } from "tests/repositories/in-memory-workspace-repository";
import { CreateWorkspaceCase } from "./create-workspace-case";
import { makeWorkspace } from "tests/factories/makeWorkspace";
import { GetAllWorkspacesByCreatorIdCase } from "./get-workspaces-by-creator-id-case";
import { Workspace } from "~/domain/entities/Workspaces/Workspace";

describe("Workspace", () => {
  let inMemoryWorkspaceRepository: InMemoryWorkspaceRepository;
  let getAllWorkspacecsByCreatorIdCase: GetAllWorkspacesByCreatorIdCase;
  let createWorkspaceCase: CreateWorkspaceCase;
  let workspaceTesting: Workspace;
  let listWorkspaces: Workspace[];
  beforeEach(async () => {
    inMemoryWorkspaceRepository = new InMemoryWorkspaceRepository();
    createWorkspaceCase = new CreateWorkspaceCase(inMemoryWorkspaceRepository);
    const { workspace } = await createWorkspaceCase.execute(makeWorkspace());
    getAllWorkspacecsByCreatorIdCase = new GetAllWorkspacesByCreatorIdCase(
      inMemoryWorkspaceRepository,
    );
    getAllWorkspacecsByCreatorIdCase = new GetAllWorkspacesByCreatorIdCase(
      inMemoryWorkspaceRepository,
    );
    const { workspaces } = await getAllWorkspacecsByCreatorIdCase.execute({
      creatorId: workspace.creatorId,
    });
    workspaceTesting = workspace;
    listWorkspaces = workspaces;
  });
  it("should to return an user with equal id to workspace creatorId", async () => {
    expect(listWorkspaces).toBeDefined();
    expect(listWorkspaces).toHaveLength(1);
    expect(listWorkspaces[0]).toEqual(workspaceTesting);
    expect(listWorkspaces[0].creatorId).toEqual(workspaceTesting.creatorId);
    expect(listWorkspaces).toEqual(
      expect.arrayContaining([expect.objectContaining(workspaceTesting)]),
    );
  });
});
