import Boom from "@hapi/boom";
import { Project } from "~/domain/entities/Project/Project";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface FindProjectByIdCaseRequest {
  id: string;
}

interface FindProjectByIdCaseResponse {
  project: Project;
}

export class FindProjectByIdCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(
    request: FindProjectByIdCaseRequest,
  ): Promise<FindProjectByIdCaseResponse> {
    const { id } = request;

    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw Boom.notFound("Projeto não encontrado");
    }

    return {
      project,
    };
  }
}
