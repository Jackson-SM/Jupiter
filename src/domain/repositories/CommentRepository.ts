import { Comment } from "../entities/Comment/Comment";

export interface CommentRepository {
  create(comment: Comment): Promise<void>;
  findByid(id: string): Promise<Comment | null>;
  findAllByUserId(userId: string): Promise<Comment[]>;
  findAllCommentsByTaskId(taskId: string): Promise<Comment[]>;
  removeComment(commentId: string): Promise<void>;
}
