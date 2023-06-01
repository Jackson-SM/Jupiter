import { makeWorkspace } from "~/../tests/factories/makeWorkspace";
import { CreateWorkspaceCase } from "./create-workspace-case";
import { InMemoryWorkspaceRepository } from "~/../tests/repositories/in-memory-workspace-repository";

describe("Workspace", () => {
  it("should create a new workspace", async () => {
    const inMemoryWorkspaceRepository = new InMemoryWorkspaceRepository();
    const createWorkspaceCase = new CreateWorkspaceCase(
      inMemoryWorkspaceRepository,
    );

    const { workspace } = await createWorkspaceCase.execute(makeWorkspace());

    expect(inMemoryWorkspaceRepository.workspaces[0]).toEqual(workspace);
  });
});
