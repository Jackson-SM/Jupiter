import { CreateTaskCase } from "./create-task-case";
import { Task } from "~/domain/entities/Task/Task";
import { FindTaskByIdCase } from "./find-task-by-id-case";
import { DoneTaskCase } from "./done-task-case";
import { InMemoryTaskRepository } from "~/../tests/repositories/in-memory-task-repository";
import { makeTask } from "~/../tests/factories/makeTask";

describe("Done Task Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let findTaskByIdCase: FindTaskByIdCase;
  let doneTaskCase: DoneTaskCase;
  let taskTesting: Task;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    findTaskByIdCase = new FindTaskByIdCase(inMemoryTaskRepository);
    doneTaskCase = new DoneTaskCase(inMemoryTaskRepository);
    const { task } = await createTaskCase.execute(makeTask());
    taskTesting = task;
    await doneTaskCase.execute({ id: taskTesting.id });
  });

  it("should create a new task", async () => {
    const { task } = await findTaskByIdCase.execute({ id: taskTesting.id });

    expect(task.doneDate).toEqual(taskTesting.doneDate);
  });
});
