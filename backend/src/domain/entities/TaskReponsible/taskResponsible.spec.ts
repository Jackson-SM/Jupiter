import { TaskResponsible } from "./TaskReponsible";

describe("Task Responsible", () => {
  it("should create a new task responsible instance", () => {
    const taskResponsible = new TaskResponsible({
      taskId: "taskId",
      userId: "userId",
    });

    expect(taskResponsible).toBeTruthy();
    expect(taskResponsible).toBeDefined();
  });
});
