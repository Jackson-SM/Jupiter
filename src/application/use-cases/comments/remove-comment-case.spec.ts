import { InMemoryCommentRepository } from "tests/repositories/in-memory-comment-repository";
import { CreateCommentCase } from "./create-comment-case";
import { makeComment } from "tests/factories/makeComment";
import { FindCommentByIdCase } from "./find-comment-by-id-case";
import { RemoveCommentCase } from "./remove-comment-case";

describe("Remove Comment  Case", () => {
  it("should remove a comment by id", async () => {
    const inMemoryCommentRepository = new InMemoryCommentRepository();
    const createCommentCase = new CreateCommentCase(inMemoryCommentRepository);
    const findCommentByIdCase = new FindCommentByIdCase(
      inMemoryCommentRepository,
    );
    const removeCommentCase = new RemoveCommentCase(inMemoryCommentRepository);
    const { comment } = await createCommentCase.execute(makeComment());
    await removeCommentCase.execute(comment.id);

    await expect(
      findCommentByIdCase.execute({
        id: comment.id,
      }),
    ).rejects.toThrow();
  });
});
