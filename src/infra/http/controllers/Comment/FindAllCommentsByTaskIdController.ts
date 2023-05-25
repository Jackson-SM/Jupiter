import { Request, ResponseToolkit } from "@hapi/hapi";
import { FindAllCommentsByTaskIdCase } from "~/application/use-cases/comments/find-all-comments-by-task-id-case";
import { CommentViewModel } from "../../view-models/comment-view-model";

export class FindAllCommentsByTaskIdController {
  constructor(
    private findAllCommentsByTaskIdCase: FindAllCommentsByTaskIdCase,
  ) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { id } = request.params;

    const { comments } = await this.findAllCommentsByTaskIdCase.execute({
      id: id,
    });

    return comments.map((comment) => CommentViewModel.toHttp(comment));
  };
}
