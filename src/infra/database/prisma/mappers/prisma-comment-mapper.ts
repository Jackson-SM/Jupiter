import { Comment as RawComment } from "@prisma/client";
import { Comment } from "../../../../domain/entities/Comment/Comment";

export class PrismaCommentMapper {
  static toDomain(project: RawComment): Comment {
    return new Comment(
      {
        content: project.content,
        taskId: project.taskId,
        userId: project.userId,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      project.id,
    );
  }

  static toPrisma(project: Comment): RawComment {
    return {
      id: project.id,
      content: project.content,
      taskId: project.taskId,
      userId: project.userId,
      createdAt: project.createdAt,
      updatedAt: project.createdAt,
    };
  }
}
