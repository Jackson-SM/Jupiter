import { Task } from "../../../../domain/entities/Task/Task";
import prisma from "../client/prisma";
import Boom from "@hapi/boom";
import { TaskRepository } from "~/domain/repositories/TaskRepository";
import { PrismaTaskMapper } from "../mappers/prisma-task-mapper";

export class PrismaTaskRepository implements TaskRepository {
  async doneTask(taskId: string): Promise<void> {
    await prisma.task.update({
      where: { id: taskId },
      data: {
        doneDate: new Date(),
      },
    });
  }
  async findById(id: string): Promise<Task | null> {
    try {
      const task = await prisma.task.findUnique({ where: { id: id } });

      if (!task) {
        return null;
      }

      return PrismaTaskMapper.toDomain(task);
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findByResponsibleId(responsibleId: string): Promise<Task[]> {
    try {
      const taskByResponsibleId = await prisma.tasksResponsible.findMany({
        where: { userId: responsibleId },
        include: {
          task: true,
        },
      });

      return taskByResponsibleId.map((relation) =>
        PrismaTaskMapper.toDomain(relation.task),
      );
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async addResponsible(userId: string, taskId: string): Promise<void> {
    try {
      await prisma.tasksResponsible.create({
        data: { userId, taskId },
      });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async removeTask(taskId: string): Promise<void> {
    try {
      await prisma.task.delete({ where: { id: taskId } });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }

  async findTasksByGroupId(groupId: string): Promise<Task[]> {
    try {
      const tasks = await prisma.task.findMany({ where: { groupId: groupId } });

      return tasks.map((task) => PrismaTaskMapper.toDomain(task));
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }

  async create(task: Task): Promise<void> {
    try {
      const rawTask = PrismaTaskMapper.toPrisma(task);

      await prisma.task.create({
        data: rawTask,
      });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
}
