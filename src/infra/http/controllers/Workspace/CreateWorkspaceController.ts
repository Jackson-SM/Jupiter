import { CreateWorkspaceCase } from "../../../../application/use-cases/workspaces/create-workspace-case";
import { PrismaWorkspaceRepository } from "../../../../infra/database/prisma/repositories/prisma-workspace-repository";
import { ICreateWorkspaceBody } from "../../dtos/create-workspace-body";
import { JwtPayload } from "../../../../application/services/AuthService";
import { Request, ResponseToolkit } from "@hapi/hapi";
import Boom from "@hapi/boom";

export class CreateWorkspaceController {
  constructor(private createWorkspaceCase: CreateWorkspaceCase) {}

  async handler(request: Request, h: ResponseToolkit) {
    const { title, description } = request.payload as ICreateWorkspaceBody;
    const { id } = request.auth.credentials;

    const workspace = await createWorkspaceCase.execute({
      title,
      description,
      creatorId: String(id),
    });

    return h.response(workspace).code(201);
  }
}

const prismaRepository = new PrismaWorkspaceRepository();
const createWorkspaceCase = new CreateWorkspaceCase(prismaRepository);
export const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceCase,
);
