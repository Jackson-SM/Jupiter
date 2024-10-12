import { Injectable, NotFoundException } from '@nestjs/common';
import { Workspace } from '@src/domain/entities/workspace';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';
import { PrismaWorkspaceMapper } from '../mappers/prisma-workspace-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaWorkspaceService implements WorkspaceRepository {
  constructor(private prisma: PrismaService) {}

  async save(workspace: Workspace): Promise<Workspace> {
    console.log(workspace);
    const prismaWorkspace = PrismaWorkspaceMapper.toPrisma(workspace);
    console.log(prismaWorkspace);

    const createdWorkspace = await this.prisma.workspace.create({
      data: prismaWorkspace,
    });

    console.log(createdWorkspace);

    return PrismaWorkspaceMapper.toDomain(createdWorkspace);
  }
  async delete(id: string): Promise<void> {
    const workspaceExists = await this.prisma.workspace.findUnique({
      where: { id },
    });

    if (!workspaceExists) {
      throw new NotFoundException('Workspace not found');
    }

    await this.prisma.workspace.delete({
      where: { id: id },
      include: { Projects: true },
    });
  }
  async findById(id: string): Promise<Workspace> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return PrismaWorkspaceMapper.toDomain(workspace);
  }
}
