import { InMemoryTaskRepository } from "~/../tests/repositories/in-memory-task-repository";
import { CreateTaskCase } from "./create-task-case";
import { FindTaskByIdCase } from "./find-task-by-id-case";
import { Task } from "~/domain/entities/Task/Task";
import { makeTask } from "~/../tests/factories/makeTask";
import { InMemoryUserRepository } from "~/../tests/repositories/in-memory-user-repository";
import { CreateUserCase } from "../users/create-user-case";
import { makeUser } from "~/../tests/factories/makeUser";
import { User } from "~/domain/entities/User/User";
import { AddTaskResponsibleCase } from "./add-task-responsible-case";
import { FindAllResponsiblesTaskCase } from "./find-all-responsibles-task-case";

describe("Find Task By Id Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let inMemoryUserRepository: InMemoryUserRepository;
  let createTaskCase: CreateTaskCase;
  let createUserCase: CreateUserCase;
  let findTaskByIdCase: FindTaskByIdCase;
  let addTaskResponsibleCase: AddTaskResponsibleCase;
  let findAllResponsiblesTaskCase: FindAllResponsiblesTaskCase;
  let taskTesting: Task;
  let userTesting: User;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryTaskRepository = new InMemoryTaskRepository(inMemoryUserRepository);
    createUserCase = new CreateUserCase(inMemoryUserRepository);
    addTaskResponsibleCase = new AddTaskResponsibleCase(inMemoryTaskRepository);
    findAllResponsiblesTaskCase = new FindAllResponsiblesTaskCase(
      inMemoryTaskRepository,
    );
    const { user } = await createUserCase.execute(makeUser());
    userTesting = user;
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    findTaskByIdCase = new FindTaskByIdCase(inMemoryTaskRepository);
    const { task } = await createTaskCase.execute(makeTask());
    taskTesting = task;
    addTaskResponsibleCase.execute({
      taskId: taskTesting.id,
      userId: userTesting.id,
    });
  });

  it("should to find all users responsible for task", async () => {
    const { users } = await findAllResponsiblesTaskCase.execute({
      id: taskTesting.id,
    });

    expect(users[0]).toEqual(userTesting);
  });
});
