import { makeUser } from "tests/factories/makeUser";
import { Workspaces } from "./Workspaces";

describe("Workspace", () => {
  it("should create a new workspace instance", () => {
    const workspace = new Workspaces({
      title: "Workspace",
      description: "Description Workspacec",
      creatorId: makeUser().id,
    });

    expect(workspace).toBeTruthy();
  });
});
