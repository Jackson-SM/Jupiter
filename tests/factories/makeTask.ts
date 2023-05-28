import { Task } from "../../src/domain/entities/Task/Task";
import { makeGroup } from "./makeGroup";
import { makeUser } from "./makeUser";

type Override = Partial<Task>;

export function makeTask(override?: Override): Task {
  return new Task({
    title: "new task",
    description: "description of the task",
    groupId: makeGroup().id,
    projectId: makeUser().id,
    ...override,
  });
}
