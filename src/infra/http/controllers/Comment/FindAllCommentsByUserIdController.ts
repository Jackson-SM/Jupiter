import { Request, ResponseToolkit } from "@hapi/hapi";
import { CommentViewModel } from "../../view-models/comment-view-model";
import { FindAllCommentsByUserIdCase } from "~/application/use-cases/comments/find-all-comments-by-user-id-case";

export class FindAllCommentsByUserIdController {
  constructor(
    private findAllCommentsByUserIdCase: FindAllCommentsByUserIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { comments } = await this.findAllCommentsByUserIdCase.execute({
      id: id,
    });

    return comments.map((comment) => CommentViewModel.toHttp(comment));
  };
}
