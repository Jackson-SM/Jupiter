import { CreateGroupCase } from "./create-group-case";
import { Group } from "~/domain/entities/Group/Group";
import { EditNameGroupCase } from "./edit-name-group-case";
import { AddTaskInGroupCase } from "./add-task-in-group-case";
import { Task } from "~/domain/entities/Task/Task";
import { InMemoryGroupRepository } from "~/../tests/repositories/in-memory-group-repository";
import { makeTask } from "~/../tests/factories/makeTask";
import { makeGroup } from "~/../tests/factories/makeGroup";

describe("Add Task In Group Case", () => {
  let inMemoryGroupRepository: InMemoryGroupRepository;
  let createGroupCase: CreateGroupCase;
  let groupTesting: Group;
  let taskTesting: Task;
  let addTaskInGroupCase: AddTaskInGroupCase;

  beforeEach(async () => {
    inMemoryGroupRepository = new InMemoryGroupRepository();
    createGroupCase = new CreateGroupCase(inMemoryGroupRepository);
    addTaskInGroupCase = new AddTaskInGroupCase(inMemoryGroupRepository);
    const { group } = await createGroupCase.execute(makeGroup());
    groupTesting = group;
    taskTesting = makeTask();
  });

  it("should add a task in group", async () => {
    await addTaskInGroupCase.execute({
      groupId: groupTesting.id,
      taskId: taskTesting.id,
    });

    expect(groupTesting).toBeInstanceOf(Group);
    expect(inMemoryGroupRepository.tasksInGroup).toHaveLength(1);
    expect(inMemoryGroupRepository.tasksInGroup[0].taskId).toEqual(
      taskTesting.id,
    );
  });
});
