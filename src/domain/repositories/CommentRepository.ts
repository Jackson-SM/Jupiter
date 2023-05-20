import { Comment } from "../entities/Comment/Comment";

export interface CommentRepository {
  create(task: Comment): Promise<void>;
  findByid(id: string): Promise<Comment | null>;
  findAllByUserId(userId: string): Promise<Comment[]>;
  findAllCommentsByTaskId(taskId: string): Promise<Comment[]>;
}
