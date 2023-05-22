import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface AddParticipantInProjectCaseRequest {
  userId: string;
  projectId: string;
}

export class AddParticipantInProjectCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(request: AddParticipantInProjectCaseRequest) {
    const { userId, projectId } = request;

    await this.projectRepository.addParticipantsInProject(userId, projectId);
  }
}
