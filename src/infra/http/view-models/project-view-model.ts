import { Project } from "../../../domain/entities/Project/Project";

export class ProjectViewModel {
  static toHttp(project: Project) {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      leadId: project.leadId,
      workspaceId: project.workspaceId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
