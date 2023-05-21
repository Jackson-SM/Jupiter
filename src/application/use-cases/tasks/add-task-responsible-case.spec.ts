import { InMemoryTaskRepository } from "tests/repositories/in-memory-task-repository";
import { AddTaskResponsibleCase } from "./add-task-responsible-case";
import { makeUser } from "tests/factories/makeUser";
import { makeTask } from "tests/factories/makeTask";

describe("Add Task Responsible Case", () => {
  it("should create a new relation task and user", async () => {
    const inMemoryTaskRepository = new InMemoryTaskRepository();
    const addTaskResponsibleCase = new AddTaskResponsibleCase(
      inMemoryTaskRepository,
    );
    await addTaskResponsibleCase.execute({
      userId: makeUser().id,
      taskId: makeTask().id,
    });
    await addTaskResponsibleCase.execute({
      userId: makeUser().id,
      taskId: makeTask().id,
    });

    expect(inMemoryTaskRepository.taskResponsible).toHaveLength(2);
  });
});
