import { CommentRepository } from "~/domain/repositories/CommentRepository";
import prisma from "../client/prisma";
import Boom from "@hapi/boom";
import { Comment } from "~/domain/entities/Comment/Comment";
import { PrismaCommentMapper } from "../mappers/prisma-comment-mapper";

export class PrismaCommentRepository implements CommentRepository {
  async findByid(id: string): Promise<Comment | null> {
    try {
      const comment = await prisma.comment.findUnique({ where: { id: id } });

      if (!comment) {
        return null;
      }

      return PrismaCommentMapper.toDomain(comment);
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findAllByUserId(userId: string): Promise<Comment[]> {
    try {
      const allCommentsByUser = await prisma.comment.findMany({
        where: { userId: userId },
      });

      return allCommentsByUser.map((comment) =>
        PrismaCommentMapper.toDomain(comment),
      );
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findAllCommentsByTaskId(taskId: string): Promise<Comment[]> {
    try {
      const allCommentsByTask = await prisma.comment.findMany({
        where: { taskId: taskId },
      });

      return allCommentsByTask.map((comment) =>
        PrismaCommentMapper.toDomain(comment),
      );
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async create(comment: Comment): Promise<void> {
    const raw = PrismaCommentMapper.toPrisma(comment);

    await prisma.comment.create({
      data: raw,
    });
  }
}
