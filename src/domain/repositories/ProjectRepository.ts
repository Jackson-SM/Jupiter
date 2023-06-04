import { Project } from "../entities/Project/Project";
import { User } from "../entities/User/User";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  findAllByLeadId(leadId: string): Promise<Project[]>;
  findAllByWorkspaceId(workspaceId: string): Promise<Project[]>;
  findAllParticipantsByProjectId(projectId: string): Promise<User[]>;
  addParticipantsInProject(email: string, projectId: string): Promise<void>;
  removeParticipantInProject(userId: string, projectId: string): Promise<void>;
  removeProject(projectId: string): Promise<void>;
}
