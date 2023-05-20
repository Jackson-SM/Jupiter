import { Project } from "../entities/Project/Project";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  findAllByLeadId(leadId: string): Promise<Project[]>;
  findAllByWorkspaceId(workspaceId: string): Promise<Project[]>;
}
