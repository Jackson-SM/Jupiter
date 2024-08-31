import { TasksInGroup } from "./TasksInGroup";

describe("Tasks In Group", () => {
  it("should create a new task responsible instance", () => {
    const tasksInGroup = new TasksInGroup({
      taskId: "taskId",
      groupId: "userId",
    });

    expect(tasksInGroup).toBeTruthy();
    expect(tasksInGroup).toBeDefined();
    expect(tasksInGroup).toBeInstanceOf(TasksInGroup);
  });
});
