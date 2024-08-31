import { Project } from "~/domain/entities/Project/Project";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface FindProjectByWorkspaceByIdRequest {
  id: string;
}
interface FindProjectByWorkspaceByIdResponse {
  projects: Project[];
}

export class FindProjectByWorkspaceIdCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(
    request: FindProjectByWorkspaceByIdRequest,
  ): Promise<FindProjectByWorkspaceByIdResponse> {
    const { id } = request;

    const projects = await this.projectRepository.findAllByWorkspaceId(id);

    return {
      projects,
    };
  }
}
