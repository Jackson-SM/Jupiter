import { InMemoryCommentRepository } from "tests/repositories/in-memory-comment-repository";
import { CreateCommentCase } from "./create-comment-case";
import { makeComment } from "tests/factories/makeComment";
import { Comment } from "~/domain/entities/Comment/Comment";
import { FindAllCommentsByUserIdCase } from "./find-all-comments-by-user-id-case";
import { User } from "~/domain/entities/User/User";
import { makeUser } from "tests/factories/makeUser";

describe("Find All Comments By User Id Case", () => {
  let inMemoryCommentRepository: InMemoryCommentRepository;
  let createCommentCase: CreateCommentCase;
  let findAllCommentsByIdCase: FindAllCommentsByUserIdCase;
  let commentTesting: Comment;
  let userTesting: User;

  beforeEach(async () => {
    inMemoryCommentRepository = new InMemoryCommentRepository();
    createCommentCase = new CreateCommentCase(inMemoryCommentRepository);
    findAllCommentsByIdCase = new FindAllCommentsByUserIdCase(
      inMemoryCommentRepository,
    );
    userTesting = makeUser();
    const { comment } = await createCommentCase.execute(
      makeComment({ userId: userTesting.id }),
    );
    await createCommentCase.execute(makeComment({ userId: userTesting.id }));
    await createCommentCase.execute(makeComment({ userId: userTesting.id }));
    await createCommentCase.execute(makeComment());
    commentTesting = comment;
  });

  it("should find all comments of the one user", async () => {
    const { comments } = await findAllCommentsByIdCase.execute({
      id: userTesting.id,
    });
    expect(comments).toHaveLength(3);
    expect(comments).toEqual(
      expect.arrayContaining([expect.objectContaining(commentTesting)]),
    );
  });
});
