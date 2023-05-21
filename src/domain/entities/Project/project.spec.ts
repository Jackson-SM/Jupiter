import { Project } from "./Project";

describe("Project", () => {
  it("should create a new user instance", () => {
    const project = new Project({
      title: "title",
      description: "description",
      leadId: "aaaaaaaaaaaaaaaaa",
      workspaceId: "aaaaaaaaaa",
    });

    expect(project).toBeTruthy();
    expect(project).toBeDefined();
  });
});
