import { InMemoryCommentRepository } from "tests/repositories/in-memory-comment-repository";
import { CreateCommentCase } from "./create-comment-case";
import { makeComment } from "tests/factories/makeComment";
import { Comment } from "~/domain/entities/Comment/Comment";
import { FindAllCommentsByTaskIdCase } from "./find-all-comments-by-task-id-case";
import { makeTask } from "tests/factories/makeTask";
import { Task } from "~/domain/entities/Task/Task";

describe("Find All Comments By User Id Case", () => {
  let inMemoryCommentRepository: InMemoryCommentRepository;
  let createCommentCase: CreateCommentCase;
  let findAllCommentsByTaskIdCase: FindAllCommentsByTaskIdCase;
  let commentTesting: Comment;
  let taskTesting: Task;

  beforeEach(async () => {
    inMemoryCommentRepository = new InMemoryCommentRepository();
    createCommentCase = new CreateCommentCase(inMemoryCommentRepository);
    findAllCommentsByTaskIdCase = new FindAllCommentsByTaskIdCase(
      inMemoryCommentRepository,
    );
    taskTesting = makeTask();
    const { comment } = await createCommentCase.execute(
      makeComment({ taskId: taskTesting.id }),
    );
    await createCommentCase.execute(makeComment({ taskId: taskTesting.id }));
    await createCommentCase.execute(makeComment({ taskId: taskTesting.id }));
    await createCommentCase.execute(makeComment());
    commentTesting = comment;
  });

  it("should find all comments of the one user", async () => {
    const { comments } = await findAllCommentsByTaskIdCase.execute({
      id: taskTesting.id,
    });
    expect(comments).toHaveLength(3);
    expect(comments).toEqual(
      expect.arrayContaining([expect.objectContaining(commentTesting)]),
    );
  });
});
