import Boom from "@hapi/boom";
import { Project } from "../../src/domain/entities/Project/Project";
import { ProjectParticipanting } from "../../src/domain/entities/ProjectParticipanting/ProjectParticipanting";
import { User } from "../../src/domain/entities/User/User";
import { ProjectRepository } from "../../src/domain/repositories/ProjectRepository";
import { UserRepository } from "../../src/domain/repositories/UserRepository";

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

  async findAllProjectParticipantingByUser(userId: string): Promise<Project[]> {
    const projectsParticipanting = this.participants
      .filter((participant) => participant.userId === userId)
      .map((participant) => participant.projectId);

    const projects = projectsParticipanting.map((projectId) =>
      this.findById(projectId),
    );

    const projectsPromise = await Promise.all(projects);

    return projectsPromise.filter((project) => project !== null) as Project[];
  }

  async findAllByLeadId(leadId: string): Promise<Project[]> {
    const project = this.projects.filter(
      (project) => project.leadId === leadId,
    );

    return project;
  }

  async addParticipantsInProject(
    email: string,
    projectId: string,
  ): Promise<void> {
    const user = await this.userRepository?.findByEmail(email);

    if (!user) {
      throw Boom.notFound("Usuário não encontrado.");
    }

    const projectParticipant = new ProjectParticipanting({
      userId: user.id,
      projectId,
    });

    this.participants.push(projectParticipant);
  }

  async removeParticipantInProject(
    userId: string,
    projectId: string,
  ): Promise<void> {
    const participantRemoved = this.participants.filter(
      (participant) =>
        participant.userId !== userId || participant.projectId !== projectId,
    );

    this.participants = participantRemoved;
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
