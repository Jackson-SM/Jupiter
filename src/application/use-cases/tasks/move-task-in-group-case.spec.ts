import { MoveTaskInGroupCase } from "./move-task-in-group-case";
import { Task } from "~/domain/entities/Task/Task";
import { makeTask } from "~/../tests/factories/makeTask";
import { InMemoryTaskRepository } from "~/../tests/repositories/in-memory-task-repository";
import { CreateTaskCase } from "./create-task-case";

describe("Move Task Group Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let taskTesting: Task;
  let moveTaskInGroupCase: MoveTaskInGroupCase;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    const { task } = await createTaskCase.execute(makeTask());
    taskTesting = task;
    moveTaskInGroupCase = new MoveTaskInGroupCase(inMemoryTaskRepository);
  });

  it("should to move a task to another group", async () => {
    await moveTaskInGroupCase.execute({
      newGroup: "other tasks",
      taskId: taskTesting.id,
    });

    expect(inMemoryTaskRepository.tasks[0].groupId).toEqual("other tasks");
  });
});
