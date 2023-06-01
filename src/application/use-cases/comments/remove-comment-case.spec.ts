import { makeComment } from "~/../tests/factories/makeComment";
import { CreateCommentCase } from "./create-comment-case";
import { FindCommentByIdCase } from "./find-comment-by-id-case";
import { RemoveCommentCase } from "./remove-comment-case";
import { InMemoryCommentRepository } from "~/../tests/repositories/in-memory-comment-repository";

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
