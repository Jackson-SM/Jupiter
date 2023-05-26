import { CommentRepository } from "~/domain/repositories/CommentRepository";

export class RemoveCommentCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(commentId: string): Promise<void> {
    await this.commentRepository.removeComment(commentId);
  }
}
