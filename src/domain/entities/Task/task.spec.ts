import { Task } from "./Task";

describe("User", () => {
  it("should create a new user instance", () => {
    const task = new Task({
      title: "title",
      description: "description",
      projectId: "aaaaaaaaaaaaaa",
    });

    expect(task).toBeTruthy();
    expect(task).toBeDefined();
  });
});
