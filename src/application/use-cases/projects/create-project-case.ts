import { Project } from "~/domain/entities/Project/Project";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface CreateProjectCaseRequest {
  title: string;
  description: string;
  workspaceId: string;
  leadId: string;
}

export class CreateProjectCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(request: CreateProjectCaseRequest) {
    const { title, description, workspaceId, leadId } = request;

    const project = new Project({ title, description, workspaceId, leadId });

    await this.projectRepository.create(project);
  }
}
