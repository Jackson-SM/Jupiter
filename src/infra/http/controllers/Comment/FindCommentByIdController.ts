import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindCommentByIdCase } from "~/application/use-cases/comments/find-comment-by-id-case";
import { CommentViewModel } from "../../view-models/comment-view-model";

export class FindCommentByIdController {
  constructor(private findCommentByIdCase: FindCommentByIdCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { comment } = await this.findCommentByIdCase.execute({ id: id });

    return CommentViewModel.toHttp(comment);
  };
}
