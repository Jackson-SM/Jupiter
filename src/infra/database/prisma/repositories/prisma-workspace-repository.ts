import Boom from "@hapi/boom";
import { Workspace } from "../../../../domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "../../../../domain/repositories/WorkspaceRepository";
import prisma from "../client/prisma";
import { PrismaWorkspaceMapper } from "../mappers/prisma-workspace-mapper";

export class PrismaWorkspaceRepository implements WorkspaceRepository {
  async findByid(id: string): Promise<Workspace | null> {
    try {
      const workspace = await prisma.workspace.findUnique({
        where: {
          id: id,
        },
      });

      if (!workspace) {
        return null;
      }

      return PrismaWorkspaceMapper.toDomain(workspace);
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("Formato de ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async getAllByCreatorId(creatorId: string): Promise<Workspace[]> {
    try {
      const raw = await prisma.workspace.findMany({
        where: { creatorId: creatorId },
      });

      const workspaces = raw.map((workspace) =>
        PrismaWorkspaceMapper.toDomain(workspace),
      );

      return workspaces;
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("Formato de ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async removeWorkspace(workspaceId: string): Promise<void> {
    try {
      await prisma.projectParticipanting.deleteMany({
        where: {
          project: {
            workspaceId,
          },
        },
      });
      await prisma.tasksResponsible.deleteMany({
        where: {
          task: {
            Group: {
              project: {
                workspaceId,
              },
            },
          },
        },
      });
      await prisma.tasksInGroup.deleteMany({
        where: {
          group: {
            project: {
              workspaceId,
            },
          },
        },
      });

      await prisma.comment.deleteMany({
        where: {
          task: {
            Group: {
              project: {
                workspaceId,
              },
            },
          },
        },
      });

      await prisma.task.deleteMany({
        where: {
          Group: {
            project: {
              workspaceId,
            },
          },
        },
      });

      await prisma.group.deleteMany({
        where: {
          project: {
            workspaceId,
          },
        },
      });
      await prisma.project.deleteMany({
        where: {
          workspaceId,
        },
      });
      await prisma.workspace.delete({
        where: {
          id: workspaceId,
        },
      });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("Formato de ID Inválido");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async create(workspace: Workspace): Promise<void> {
    try {
      const raw = PrismaWorkspaceMapper.toPrisma(workspace);

      await prisma.workspace.create({
        data: raw,
      });
    } catch (err: any) {
      throw Boom.badRequest("Dados inválidos ou mal formatados");
    }
  }
}
