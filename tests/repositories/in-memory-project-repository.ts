import { Project } from "~/domain/entities/Project/Project";
import { ProjectParticipanting } from "~/domain/entities/ProjectParticipanting/ProjectParticipanting";
import { User } from "~/domain/entities/User/User";
import { ProjectRepository } from "~/domain/repositories/ProjectRepository";
import { UserRepository } from "~/domain/repositories/UserRepository";

export class InMemoryProjectRepository implements ProjectRepository {
  public projects: Project[] = [];
  public participants: ProjectParticipanting[] = [];

  constructor(private userRepository?: UserRepository) {}

  async findById(id: string): Promise<Project | null> {
    const project = await this.projects.find((project) => project.id === id);

    if (!project) {
      return null;
    }

    return project;
  }

  async findAllByWorkspaceId(workspaceId: string): Promise<Project[]> {
    const project = this.projects.filter(
      (project) => project.workspaceId === workspaceId,
    );

    return project;
  }

  async findAllByLeadId(leadId: string): Promise<Project[]> {
    const project = this.projects.filter(
      (project) => project.leadId === leadId,
    );

    return project;
  }

  async addParticipantsInProject(
    userId: string,
    projectId: string,
  ): Promise<void> {
    const projectParticipant = new ProjectParticipanting({ userId, projectId });

    this.participants.push(projectParticipant);
  }

  async findAllParticipantsByProjectId(projectId: string): Promise<User[]> {
    const userIdsParticipantingProject = await this.participants
      .filter((project) => project.projectId === projectId)
      .map((project) => project.userId);

    const filterUsersParticipants = userIdsParticipantingProject.map((userId) =>
      this.userRepository?.findById(userId),
    );

    const users = await Promise.all(filterUsersParticipants);

    return users.filter((user) => user !== null) as User[];
  }
  async removeProject(projectId: string): Promise<void> {
    const arrayRemoves = this.projects.filter(
      (project) => project.id !== projectId,
    );

    this.projects = arrayRemoves;
  }
  async create(project: Project): Promise<void> {
    this.projects.push(project);
  }
}
