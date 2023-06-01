import { makeComment } from "~/../tests/factories/makeComment";
import { CreateCommentCase } from "./create-comment-case";
import { FindCommentByIdCase } from "./find-comment-by-id-case";
import { Comment } from "~/domain/entities/Comment/Comment";
import { InMemoryCommentRepository } from "~/../tests/repositories/in-memory-comment-repository";

describe("Find Comment  Case", () => {
  let inMemoryCommentRepository: InMemoryCommentRepository;
  let createCommentCase: CreateCommentCase;
  let findCommentByIdCase: FindCommentByIdCase;
  let commentTesting: Comment;

  beforeEach(async () => {
    inMemoryCommentRepository = new InMemoryCommentRepository();
    createCommentCase = new CreateCommentCase(inMemoryCommentRepository);
    findCommentByIdCase = new FindCommentByIdCase(inMemoryCommentRepository);
    const { comment } = await createCommentCase.execute(makeComment());
    commentTesting = comment;
  });

  it("should find a comment in comments array", async () => {
    const { comment: commentFound } = await findCommentByIdCase.execute({
      id: commentTesting.id,
    });
    expect(commentFound).toEqual(commentTesting);
    expect(commentFound).toBeInstanceOf(Comment);
  });
  it("should throw error if comment not found", async () => {
    await expect(
      findCommentByIdCase.execute({
        id: "idtesting",
      }),
    ).rejects.toThrow();
  });
});
