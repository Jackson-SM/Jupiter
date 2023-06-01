import { CreateWorkspaceCase } from "./create-workspace-case";
import { RemoveWorkspaceCase } from "./remove-workspace-case";
import { FindWorkspaceByIdCase } from "./find-workspace-by-id-case";
import { InMemoryWorkspaceRepository } from "~/../tests/repositories/in-memory-workspace-repository";
import { makeWorkspace } from "~/../tests/factories/makeWorkspace";

describe("Remove Workspace", () => {
  it("should remove a workspace by id", async () => {
    const inMemoryWorkspaceRepository = new InMemoryWorkspaceRepository();
    const createWorkspaceCase = new CreateWorkspaceCase(
      inMemoryWorkspaceRepository,
    );
    const removeWorkspaceCase = new RemoveWorkspaceCase(
      inMemoryWorkspaceRepository,
    );
    const findWorkspaceByIdCase = new FindWorkspaceByIdCase(
      inMemoryWorkspaceRepository,
    );

    const { workspace } = await createWorkspaceCase.execute(makeWorkspace());
    await removeWorkspaceCase.execute(workspace.id);

    await expect(
      findWorkspaceByIdCase.execute({ id: workspace.id }),
    ).rejects.toThrow();
  });
});
