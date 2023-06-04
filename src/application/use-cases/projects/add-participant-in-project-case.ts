import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

interface AddParticipantInProjectCaseRequest {
  email: string;
  projectId: string;
}

export class AddParticipantInProjectCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(request: AddParticipantInProjectCaseRequest) {
    const { email, projectId } = request;

    await this.projectRepository.addParticipantsInProject(email, projectId);
  }
}
