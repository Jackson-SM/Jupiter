import { Project } from "../../../../domain/entities/Project/Project";
import prisma from "../client/prisma";
import Boom from "@hapi/boom";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";
import { PrismaProjectMapper } from "../mappers/prisma-project-mapper";
import { User } from "~/domain/entities/User/User";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

export class PrismaProjectRepository implements ProjectRepository {
  async findById(id: string): Promise<Project | null> {
    try {
      const project = await prisma.project.findUnique({ where: { id: id } });

      if (!project) {
        return null;
      }

      return PrismaProjectMapper.toDomain(project);
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findAllByWorkspaceId(workspaceId: string): Promise<Project[]> {
    try {
      const projects = await prisma.project.findMany({
        where: { workspaceId: workspaceId },
      });

      return projects.map((project) => PrismaProjectMapper.toDomain(project));
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }
  async findAllByLeadId(leadId: string): Promise<Project[]> {
    try {
      const projects = await prisma.project.findMany({
        where: { leadId: leadId },
      });

      return projects.map((project) => PrismaProjectMapper.toDomain(project));
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }

  async findAllParticipantsByProjectId(projectId: string): Promise<User[]> {
    const participants = await prisma.projectParticipanting.findMany({
      where: { projectId: projectId },
      include: {
        user: true,
      },
    });

    const users = participants.map((participant) => participant.user);

    return users.map((user) => PrismaUserMapper.toDomain(user));
  }

  async addParticipantsInProject(
    email: string,
    projectId: string,
  ): Promise<void> {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw Boom.notFound("Usuário Não encontrado!");
    }

    const isParticipant = await prisma.projectParticipanting.findFirst({
      where: { userId: user.id, projectId: projectId },
    });
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw Boom.notFound("Projeto não encontrado");
    }

    if (isParticipant || project.leadId === user.id) {
      throw Boom.conflict("Usuário já está no projeto.");
    }

    await prisma.projectParticipanting.create({
      data: { userId: user.id, projectId },
    });
  }

  async removeParticipantInProject(
    userId: string,
    projectId: string,
  ): Promise<void> {
    try {
      await prisma.projectParticipanting.deleteMany({
        where: { userId, projectId },
      });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID Invalid");
      }
      throw Boom.badRequest(err.message);
    }
  }

  async removeProject(projectId: string): Promise<void> {
    try {
      await prisma.projectParticipanting.deleteMany({
        where: { projectId },
      });
      await prisma.group.deleteMany({
        where: { projectId },
      });
      await prisma.project.delete({ where: { id: projectId } });
    } catch (err: any) {
      if (err.code === "P2023") {
        throw Boom.badRequest("ID's Inválidos");
      }

      throw Boom.badRequest(err.message);
    }
  }

  async create(project: Project): Promise<void> {
    const raw = PrismaProjectMapper.toPrisma(project);

    await prisma.project.create({
      data: raw,
    });
  }
}
