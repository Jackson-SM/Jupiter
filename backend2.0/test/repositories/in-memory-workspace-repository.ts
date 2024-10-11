import { NotFoundException } from '@nestjs/common';
import { Workspace } from '@src/domain/entities/workspace';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';

export class InMemoryWorkspaceRepository implements WorkspaceRepository {
  private workspaces: Workspace[] = [];

  async save(workspace: Workspace): Promise<Workspace> {
    this.workspaces.push(workspace);

    return workspace;
  }

  async delete(id: string): Promise<void> {
    const userExists = this.workspaces.find((workspace) => workspace.id === id);

    if (!userExists) {
      throw new NotFoundException('Workspace doesnt exist');
    }

    const workspacesFilter = this.workspaces.filter(
      (workspace) => workspace.id !== id,
    );

    this.workspaces = workspacesFilter;
  }

  async findById(id: string): Promise<Workspace> {
    const workspace = this.workspaces.find((workspace) => workspace.id === id);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return workspace;
  }
}
