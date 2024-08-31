import { Workspace } from "./Workspace";

describe("Workspace", () => {
  it("should create a new workspace instance", () => {
    const workspace = new Workspace({
      title: "Workspace",
      description: "Description Workspacec",
      creatorId: "creatorid",
    });

    expect(workspace).toBeTruthy();
  });
});
