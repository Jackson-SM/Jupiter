import Boom from "@hapi/boom";
import { Comment } from "~/domain/entities/Comment/Comment";
import { CommentRepository } from "~/domain/repositories/CommentRepository";

interface FindCommentByIdCaseRequest {
  id: string;
}
interface FindCommentByIdCaseResponse {
  comment: Comment;
}

export class FindCommentByIdCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(
    request: FindCommentByIdCaseRequest,
  ): Promise<FindCommentByIdCaseResponse> {
    const { id } = request;

    const comment = await this.commentRepository.findByid(id);

    if (!comment) {
      throw Boom.notFound("Comment not found");
    }

    return {
      comment,
    };
  }
}
