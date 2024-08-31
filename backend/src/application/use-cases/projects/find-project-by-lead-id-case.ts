import { Project } from "~/domain/entities/Project/Project";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface FindProjectByLeadIdCaseRequest {
  id: string;
}

interface FindProjectByLeadIdCaseResponse {
  projects: Project[];
}

export class FindProjectByLeadIdCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(
    request: FindProjectByLeadIdCaseRequest,
  ): Promise<FindProjectByLeadIdCaseResponse> {
    const { id } = request;

    const projects = await this.projectRepository.findAllByLeadId(id);

    return {
      projects,
    };
  }
}
