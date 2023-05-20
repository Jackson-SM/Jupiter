import { Project } from "~/domain/entities/Project/Project";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

export class InMemoryProjectRepository implements ProjectRepository {
  public projects: Project[] = [];

  async findByid(id: string): Promise<Project | null> {
    const user = await this.projects.find((workspace) => workspace.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByWorkspaceId(workspaceId: string): Promise<Project | null> {
    const project = this.projects.find(
      (project) => project.workspaceId === workspaceId,
    );

    if (!project) {
      return null;
    }

    return project;
  }

  async findByLeadId(leadId: string): Promise<Project | null> {
    const project = this.projects.find(
      (project) => project.projectLeadId === leadId,
    );

    if (!project) {
      return null;
    }

    return project;
  }
  async create(project: Project): Promise<void> {
    this.projects.push(project);
  }
}
