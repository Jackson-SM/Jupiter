import { Comment } from "~/domain/entities/Comment/Comment";
import { CommentRepository } from "~/domain/repositories/CommentRepository";

interface CreateCommentCaseRequest {
  content: string;
  userId: string;
  taskId: string;
}
interface CreateCommentCaseResponse {
  comment: Comment;
}

export class CreateCommentCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(
    request: CreateCommentCaseRequest,
  ): Promise<CreateCommentCaseResponse> {
    const { content, taskId, userId } = request;
    const comment = new Comment({ content, taskId, userId });

    return {
      comment,
    };
  }
}
