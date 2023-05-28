import { CreateTaskCase } from "./create-task-case";
import { InMemoryTaskRepository } from "tests/repositories/in-memory-task-repository";
import { makeTask } from "tests/factories/makeTask";
import { Task } from "~/domain/entities/Task/Task";
import { User } from "~/domain/entities/User/User";
import { makeUser } from "tests/factories/makeUser";
import { AddTaskResponsibleCase } from "./add-task-responsible-case";
import { FindTaskByResponsibleIdCase } from "./find-task-by-responsible-id-case";

describe("Find Task By Responsible Id Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let findByResponsibleIdCase: FindTaskByResponsibleIdCase;
  let addTaskResponsibleCase: AddTaskResponsibleCase;
  let taskTesting: Task;
  let userTesting: User;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    addTaskResponsibleCase = new AddTaskResponsibleCase(inMemoryTaskRepository);
    findByResponsibleIdCase = new FindTaskByResponsibleIdCase(
      inMemoryTaskRepository,
    );
    userTesting = makeUser();
    const { task } = await createTaskCase.execute(makeTask());
    taskTesting = task;
    await addTaskResponsibleCase.execute({
      userId: userTesting.id,
      taskId: taskTesting.id,
    });
  });

  it("should return tasks user is responsible", async () => {
    const { tasks } = await findByResponsibleIdCase.execute({
      id: userTesting.id,
    });

    expect(tasks).toEqual(
      expect.arrayContaining([expect.objectContaining(taskTesting)]),
    );
  });
});
