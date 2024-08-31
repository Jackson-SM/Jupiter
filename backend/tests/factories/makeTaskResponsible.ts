import { TaskResponsible } from "../../src/domain/entities/TaskReponsible/TaskReponsible";
import { makeTask } from "./makeTask";
import { makeUser } from "./makeUser";

type Override = Partial<TaskResponsible>;

export function makeTaskResponsible(override?: Override): TaskResponsible {
  return new TaskResponsible({
    taskId: makeTask().id,
    userId: makeUser().id,
    ...override,
  });
}
