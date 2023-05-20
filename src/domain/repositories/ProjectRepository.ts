import { Project } from "../entities/Project/Project";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  findByid(id: string): Promise<Project | null>;
  findByLeadId(leadId: string): Promise<Project | null>;
  findByWorkspaceId(workspaceId: string): Promise<Project | null>;
}
