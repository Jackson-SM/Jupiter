import { Project as RawProject } from "@prisma/client";
import { Project } from "../../../../domain/entities/Project/Project";

export class PrismaProjectMapper {
  static toDomain(project: RawProject): Project {
    return new Project(
      {
        title: project.title,
        description: project.description,
        leadId: project.leadId,
        workspaceId: project.workspaceId,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      project.id,
    );
  }

  static toPrisma(project: Project): RawProject {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      workspaceId: project.workspaceId,
      leadId: project.leadId,
      createdAt: project.createdAt,
      updatedAt: project.createdAt,
    };
  }
}
