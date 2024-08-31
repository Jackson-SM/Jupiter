import { CreateCommentCase } from "./create-comment-case";
import { Comment } from "~/domain/entities/Comment/Comment";
import { FindCommentByIdCase } from "./find-comment-by-id-case";
import { makeComment } from "~/../tests/factories/makeComment";
import { InMemoryCommentRepository } from "~/../tests/repositories/in-memory-comment-repository";

describe("Create Comment  Case", () => {
  it("should create a new comment", async () => {
    const inMemoryCommentRepository = new InMemoryCommentRepository();
    const createCommentCase = new CreateCommentCase(inMemoryCommentRepository);
    const findCommentByIdCase = new FindCommentByIdCase(
      inMemoryCommentRepository,
    );
    const { comment } = await createCommentCase.execute(makeComment());
    const { comment: commentFound } = await findCommentByIdCase.execute({
      id: comment.id,
    });
    expect(comment).toBeInstanceOf(Comment);
    expect(comment).toEqual(commentFound);
  });
});
