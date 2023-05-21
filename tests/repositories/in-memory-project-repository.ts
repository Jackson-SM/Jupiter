import { Project } from "~/domain/entities/Project/Project";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

export class InMemoryProjectRepository implements ProjectRepository {
  public projects: Project[] = [];

  async findById(id: string): Promise<Project | null> {
    const project = await this.projects.find((project) => project.id === id);

    if (!project) {
      return null;
    }

    return project;
  }

  async findAllByWorkspaceId(workspaceId: string): Promise<Project[]> {
    const project = this.projects.filter(
      (project) => project.workspaceId === workspaceId,
    );

    return project;
  }

  async findAllByLeadId(leadId: string): Promise<Project[]> {
    const project = this.projects.filter(
      (project) => project.leadId === leadId,
    );

    return project;
  }
  async create(project: Project): Promise<void> {
    this.projects.push(project);
  }
}
