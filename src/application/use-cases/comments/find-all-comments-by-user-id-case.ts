import Boom from "@hapi/boom";
import { Comment } from "~/domain/entities/Comment/Comment";
import { CommentRepository } from "~/domain/repositories/CommentRepository";

interface FindAllCommentsByUserIdCaseRequest {
  id: string;
}
interface FindAllCommentsByUserIdCaseResponse {
  comments: Comment[];
}

export class FindAllCommentsByUserIdCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(
    request: FindAllCommentsByUserIdCaseRequest,
  ): Promise<FindAllCommentsByUserIdCaseResponse> {
    const { id } = request;

    const comments = await this.commentRepository.findAllByUserId(id);

    return {
      comments,
    };
  }
}
