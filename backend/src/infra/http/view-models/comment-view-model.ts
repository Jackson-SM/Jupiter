import { Comment } from "~/domain/entities/Comment/Comment";

export class CommentViewModel {
  static toHttp(comment: Comment) {
    return {
      id: comment.id,
      content: comment.content,
      userId: comment.userId,
      taskId: comment.taskId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
  }
}
