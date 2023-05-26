import { ProjectRepository } from "~/domain/repositories/ProjectRepository";

export class RemoveProjectCase {
  constructor(private projectRepository: ProjectRepository) {}

  async execute(projectId: string): Promise<void> {
    await this.projectRepository.removeProject(projectId);
  }
}
