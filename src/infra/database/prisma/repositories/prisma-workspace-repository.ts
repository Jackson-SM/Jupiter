import { Workspace } from "../../../../domain/entities/Workspaces/Workspace";
import { WorkspaceRepository } from "../../../../domain/repositories/WorkspaceRepository";
import prisma from "../client/prisma";
import { PrismaWorkspaceMapper } from "../mappers/prisma-workspace-mapper";

export class PrismaWorkspaceRepository implements WorkspaceRepository {
  async findByid(id: string): Promise<Workspace | null> {
    const workspace = await prisma.workspace.findUnique({
      where: {
        id: id,
      },
    });

    if (!workspace) {
      return null;
    }

    return PrismaWorkspaceMapper.toDomain(workspace);
  }
  async create(workspace: Workspace): Promise<void> {
    const raw = PrismaWorkspaceMapper.toPrisma(workspace);

    await prisma.workspace.create({
      data: raw,
    });
  }
}
