import { User } from "~/domain/entities/User/User";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface FindAllParticipantsByProjectIdCaseRequest {
  projectId: string;
}
interface FindAllParticipantsByProjectIdCaseResponse {
  users: User[];
}

export class FindAllParticipantsByProjectIdCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(
    request: FindAllParticipantsByProjectIdCaseRequest,
  ): Promise<FindAllParticipantsByProjectIdCaseResponse> {
    const { projectId } = request;

    const usersParticipanting =
      await this.projectRepository.findAllParticipantsByProjectId(projectId);

    return {
      users: usersParticipanting,
    };
  }
}
