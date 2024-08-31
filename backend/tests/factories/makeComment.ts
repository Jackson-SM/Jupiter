import { Comment } from "../../src/domain/entities/Comment/Comment";
import { makeUser } from "./makeUser";
import { makeTask } from "./makeTask";

type Override = Partial<Comment>;

export function makeComment(override?: Override): Comment {
  return new Comment({
    content: "new Comment",
    userId: makeUser().id,
    taskId: makeTask().id,
    ...override,
  });
}
