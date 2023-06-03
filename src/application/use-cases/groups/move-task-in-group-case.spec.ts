import { CreateGroupCase } from "./create-group-case";
import { Group } from "~/domain/entities/Group/Group";
import { MoveTaskInGroupCase } from "./move-task-in-group-case";
import { AddTaskInGroupCase } from "./add-task-in-group-case";
import { Task } from "~/domain/entities/Task/Task";
import { InMemoryGroupRepository } from "~/../tests/repositories/in-memory-group-repository";
import { makeGroup } from "~/../tests/factories/makeGroup";
import { makeTask } from "~/../tests/factories/makeTask";

describe("Move Task Group Case", () => {
  let inMemoryGroupRepository: InMemoryGroupRepository;
  let createGroupCase: CreateGroupCase;
  let groupTesting: Group;
  let moveTaskInGroupCase: MoveTaskInGroupCase;
  let addTaskInGroup: AddTaskInGroupCase;
  let taskTesting: Task;

  beforeEach(async () => {
    inMemoryGroupRepository = new InMemoryGroupRepository();
    createGroupCase = new CreateGroupCase(inMemoryGroupRepository);
    moveTaskInGroupCase = new MoveTaskInGroupCase(inMemoryGroupRepository);
    addTaskInGroup = new AddTaskInGroupCase(inMemoryGroupRepository);
    const { group } = await createGroupCase.execute(makeGroup());
    groupTesting = group;
    taskTesting = makeTask();
    await addTaskInGroup.execute({
      groupId: groupTesting.id,
      taskId: taskTesting.id,
    });
  });

  it("should to move a task to another group", async () => {
    await moveTaskInGroupCase.execute({
      newGroup: "other tasks",
      taskId: taskTesting.id,
    });

    expect(inMemoryGroupRepository.tasksInGroup[0].groupId).toEqual(
      "other tasks",
    );
  });
});
