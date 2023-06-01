import { InMemoryTaskRepository } from "~/../tests/repositories/in-memory-task-repository";
import { CreateTaskCase } from "./create-task-case";
import { FindTaskByIdCase } from "./find-task-by-id-case";
import { Task } from "~/domain/entities/Task/Task";
import { makeTask } from "~/../tests/factories/makeTask";

describe("Find Task By Id Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let findTaskByIdCase: FindTaskByIdCase;
  let taskTesting: Task;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    findTaskByIdCase = new FindTaskByIdCase(inMemoryTaskRepository);
    const { task } = await createTaskCase.execute(makeTask());
    taskTesting = task;
  });

  it("should to find a new Task was created", async () => {
    const { task } = await findTaskByIdCase.execute({
      id: taskTesting.id,
    });

    expect(task).toEqual(taskTesting);
    expect(task).toBeDefined();
  });
  it("should throw new error if Task not exists", async () => {
    await expect(
      findTaskByIdCase.execute({
        id: makeTask().id,
      }),
    ).rejects.toThrow();
  });
});
