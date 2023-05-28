import { CreateTaskCase } from "./create-task-case";
import { InMemoryTaskRepository } from "tests/repositories/in-memory-task-repository";
import { makeTask } from "tests/factories/makeTask";
import { Task } from "~/domain/entities/Task/Task";
import { FindTaskByGroupIdCase } from "./find-task-by-group-id";
import { Group } from "~/domain/entities/Group/Group";
import { makeGroup } from "tests/factories/makeGroup";

describe("Find Task By Group Id Case", () => {
  let inMemoryTaskRepository: InMemoryTaskRepository;
  let createTaskCase: CreateTaskCase;
  let findTaskByGroupIdCase: FindTaskByGroupIdCase;
  let groupTesting: Group;

  beforeEach(async () => {
    inMemoryTaskRepository = new InMemoryTaskRepository();
    createTaskCase = new CreateTaskCase(inMemoryTaskRepository);
    findTaskByGroupIdCase = new FindTaskByGroupIdCase(inMemoryTaskRepository);
    groupTesting = makeGroup();
    await createTaskCase.execute(makeTask({ groupId: groupTesting.id }));
  });

  it("should to find a Task with group id equal group testing", async () => {
    const { tasks } = await findTaskByGroupIdCase.execute({
      id: groupTesting.id,
    });

    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ groupId: groupTesting.id }),
      ]),
    );
    expect(tasks[0].groupId).toEqual(groupTesting.id);
  });
});
