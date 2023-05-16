import { InMemoryWorkspaceRepository } from "tests/repositories/in-memory-workspace-repository";
import { makeWorkspace } from "tests/factories/makeWorkspace";
import { FindWorkspaceByIdCase } from "./find-workspace-by-id-case";
import { CreateWorkspaceCase } from "./create-workspace-case";
import { Workspace } from "~/domain/entities/Workspaces/Workspace";

describe("Workspace", () => {
  let workspaceTesting: Workspace;
  let inMemoryWorkspaceRepository: InMemoryWorkspaceRepository;
  let createWorkspaceCase: CreateWorkspaceCase;
  let findWorkspaceByIdCase: FindWorkspaceByIdCase;

  beforeEach(async () => {
    inMemoryWorkspaceRepository = new InMemoryWorkspaceRepository();
    createWorkspaceCase = new CreateWorkspaceCase(inMemoryWorkspaceRepository);
    findWorkspaceByIdCase = new FindWorkspaceByIdCase(
      inMemoryWorkspaceRepository,
    );
    const { workspace } = await createWorkspaceCase.execute(makeWorkspace());
    workspaceTesting = workspace;
  });

  it("should return an user by id", async () => {
    const workspace = await findWorkspaceByIdCase.execute({
      id: workspaceTesting.id,
    });

    expect(inMemoryWorkspaceRepository.workspaces[0]).toEqual(workspace);
    expect(inMemoryWorkspaceRepository.workspaces).toEqual(
      expect.arrayContaining([expect.objectContaining(workspace)]),
    );
  });
  it("should throw error if not exists an user with that id", async () => {
    await expect(
      findWorkspaceByIdCase.execute({ id: "aaaaaaaaaaaaaa" }),
    ).rejects.toThrow();
  });
});
