import { CreateTaskCase } from "./create-task-case";
import { Task } from "~/domain/entities/Task/Task";
import { FindTaskByIdCase } from "./find-task-by-id-case";
import { InMemoryTaskRepository } from "~/../tests/repositories/in-memory-task-repository";
import { makeTask } from "~/../tests/factories/makeTask";
import { EditTaskCase } from "./edit-task-case";

describe("Edit Task Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let findTaskByIdCase: FindTaskByIdCase;
  let editTaskCase: EditTaskCase;
  let taskTesting: Task;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    findTaskByIdCase = new FindTaskByIdCase(inMemoryTaskRepository);
    editTaskCase = new EditTaskCase(inMemoryTaskRepository);
    const { task } = await createTaskCase.execute(makeTask());
    taskTesting = task;
    console.log(taskTesting);
    await editTaskCase.execute({
      taskId: taskTesting.id,
      description: "Descrição para a task",
      title: "Titulo novo da task",
    });
  });

  it("should to edit task was created", async () => {
    const { task } = await findTaskByIdCase.execute({ id: taskTesting.id });

    await expect(taskTesting).toEqual(task);
  });
});
