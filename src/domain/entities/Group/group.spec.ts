import { Group } from "./Group";

describe("Group", () => {
  it("should create a new group instance", () => {
    const group = new Group({
      name: "group",
      projectId: "projectid",
    });

    expect(group).toBeTruthy();
    expect(group).toBeDefined();
  });
});
