import { Project } from "~/domain/entities/Project/Project";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface FindAllProjectParticipantingByUserCaseRequest {
  userId: string;
}
interface FindAllProjectParticipantingByUserCaseResponse {
  projects: Project[];
}

export class FindAllProjectParticipantingByUserCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(
    request: FindAllProjectParticipantingByUserCaseRequest,
  ): Promise<FindAllProjectParticipantingByUserCaseResponse> {
    const { userId } = request;

    const projectParticipanting =
      await this.projectRepository.findAllProjectParticipantingByUser(userId);

    return {
      projects: projectParticipanting,
    };
  }
}
