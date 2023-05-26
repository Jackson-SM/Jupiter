import { InMemoryTaskRepository } from "tests/repositories/in-memory-task-repository";
import { CreateTaskCase } from "./create-task-case";
import { makeTask } from "tests/factories/makeTask";
import { Task } from "~/domain/entities/Task/Task";
import { FindTaskByIdCase } from "./find-task-by-id-case";
import { RemoveTaskCase } from "./remove-task-case";

describe("Remove Task Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let findTaskByIdCase: FindTaskByIdCase;
  let taskTesting: Task;
  let removeTaskCase: RemoveTaskCase;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    findTaskByIdCase = new FindTaskByIdCase(inMemoryTaskRepository);
    const { task } = await createTaskCase.execute(makeTask());
    taskTesting = task;
    removeTaskCase = new RemoveTaskCase(inMemoryTaskRepository);
  });
  it("should remove a task by id", async () => {
    await removeTaskCase.execute(taskTesting.id);

    expect(taskTesting).toBeDefined();
    await expect(
      findTaskByIdCase.execute({ id: taskTesting.id }),
    ).rejects.toThrow();
  });
});
