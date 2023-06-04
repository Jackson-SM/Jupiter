import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface RemoveParticipantInProjectCaseRequest {
  userId: string;
  projectId: string;
}

export class RemoveParticipantInProjectCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(request: RemoveParticipantInProjectCaseRequest) {
    const { userId, projectId } = request;

    await this.projectRepository.removeParticipantInProject(userId, projectId);
  }
}
