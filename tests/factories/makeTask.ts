import { Task } from "../../src/domain/entities/Task/Task";
import { makeUser } from "./makeUser";
import { makeProject } from "./makeProject";

type Override = Partial<Task>;

export function makeTask(override?: Override): Task {
  return new Task({
    title: "new task",
    description: "description of the task",
    projectId: makeUser().id,
    ...override,
  });
}
