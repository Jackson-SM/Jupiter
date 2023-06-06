import { Request, ResponseToolkit } from "@hapi/hapi";
import { RemoveCommentCase } from "~/application/use-cases/comments/remove-comment-case";

export class RemoveCommentController {
  constructor(private removeCommentCase: RemoveCommentCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    await this.removeCommentCase.execute(id);

    return h.response().code(204);
  };
}
