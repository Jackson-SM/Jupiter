import { Request, ResponseToolkit } from "@hapi/hapi";
import { CreateCommentCase } from "~/application/use-cases/comments/create-comment-case";
import { CreateCommentBody } from "../../dtos/create-comment-body";
import { CommentViewModel } from "../../view-models/comment-view-model";

export class CreateCommentController {
  constructor(private createCommentCase: CreateCommentCase) {}

  public handler = async (request: Request, h: ResponseToolkit) => {
    const { content, taskId, userId } = request.payload as CreateCommentBody;

    const { comment } = await this.createCommentCase.execute({
      content,
      taskId,
      userId,
    });

    return h.response(CommentViewModel.toHttp(comment)).code(201);
  };
}
