import { Comment } from "~/domain/entities/Comment/Comment";
import { CommentRepository } from "~/domain/repositories/CommentRepository";

export class InMemoryCommentRepository implements CommentRepository {
  public comments: Comment[] = [];

  async findByid(id: string): Promise<Comment | null> {
    const comment = this.comments.find((comment) => comment.id === id);

    if (!comment) {
      return null;
    }

    return comment;
  }

  async findByUserId(userId: string): Promise<Comment | null> {
    const comment = this.comments.find((comment) => comment.userId === userId);

    if (!comment) {
      return null;
    }

    return comment;
  }

  async findAllCommentsByTaskId(taskId: string): Promise<Comment[]> {
    const comment = this.comments.filter(
      (comment) => comment.taskId === taskId,
    );

    return comment;
  }
  async findAllCommentsByUser(userId: string): Promise<Comment[]> {
    const comment = this.comments.filter(
      (comment) => comment.userId === userId,
    );

    return comment;
  }
  async create(comment: Comment): Promise<void> {
    this.comments.push(comment);
  }
}
