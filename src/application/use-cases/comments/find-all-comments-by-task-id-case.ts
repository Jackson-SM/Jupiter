import Boom from "@hapi/boom";
import { Comment } from "~/domain/entities/Comment/Comment";
import { CommentRepository } from "~/domain/repositories/CommentRepository";

interface FindAllCommentsByTaskIdCaseRequest {
  id: string;
}
interface FindAllCommentsByTaskIdCaseResponse {
  comments: Comment[];
}

export class FindAllCommentsByTaskIdCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(
    request: FindAllCommentsByTaskIdCaseRequest,
  ): Promise<FindAllCommentsByTaskIdCaseResponse> {
    const { id } = request;

    const comments = await this.commentRepository.findAllCommentsByTaskId(id);

    return {
      comments,
    };
  }
}
