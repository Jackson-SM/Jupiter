import { Group } from "~/domain/entities/Group/Group";
import { GroupRepository } from "~/domain/repositories/GroupRepository";
import prisma from "../client/prisma";
import { PrismaGroupMapper } from "../mappers/prisma-group-mapper";
import Boom from "@hapi/boom";

export class PrismaGroupRepository implements GroupRepository {
  async createGroup(group: Group): Promise<void> {
    try {
      const rawGroup = PrismaGroupMapper.toPrisma(group);

      await prisma.group.create({
        data: rawGroup,
      });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async deleteGroup(groupId: string): Promise<void> {
    try {
      await prisma.group.delete({ where: { id: groupId } });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async editGroup(groupId: string, group: Group): Promise<void> {
    try {
      await prisma.group.update({
        where: { id: groupId },
        data: {
          name: group.name,
        },
      });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async addTaskInGroup(taskId: string, groupId: string): Promise<void> {
    try {
      await prisma.tasksInGroup.create({
        data: {
          taskId: taskId,
          groupId: groupId,
        },
      });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async moveTaskGroup(newGroup: string, taskId: string): Promise<void> {
    await prisma.tasksInGroup.updateMany({
      where: { taskId: taskId },
      data: {
        groupId: newGroup,
      },
    });
  }
  async removeTaskInGroup(taskId: string, groupId: string): Promise<void> {
    await prisma.tasksInGroup.deleteMany({
      where: { taskId: taskId },
    });
  }
  async findAllGroupsByProject(projectId: string): Promise<Group[]> {
    const groups = await prisma.group.findMany({
      where: { projectId: projectId },
    });

    return groups.map((group) => PrismaGroupMapper.toDomain(group));
  }
}
