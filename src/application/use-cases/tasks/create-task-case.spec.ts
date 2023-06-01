import { CreateTaskCase } from "./create-task-case";
import { Task } from "~/domain/entities/Task/Task";
import { FindTaskByIdCase } from "./find-task-by-id-case";
import { makeTask } from "~/../tests/factories/makeTask";
import { InMemoryTaskRepository } from "~/../tests/repositories/in-memory-task-repository";

describe("Create Task Case", () => {
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

  it("should create a new task", async () => {
    const { task } = await findTaskByIdCase.execute({ id: taskTesting.id });

    expect(task).toBeDefined();
    expect(task).toEqual(taskTesting);
  });
});
