import { PrismaProjectRepository } from "~/infra/database/prisma/repositories/prisma-project-repository";
import { CreateProjectController } from "./CreateProjectController";
import { CreateProjectCase } from "~/application/use-cases/projects/create-project-case";
import { FindProjectByIdController } from "./FindProjectByIdController";
import { FindProjectByIdCase } from "~/application/use-cases/projects/find-project-by-id-case";
import { FindProjectByLeadIdController } from "./FindProjectByLeadIdController";
import { FindProjectByWorkspaceIdController } from "./FindProjectByWorkspaceIdController";
import { FindAllParticipantsByProjectIdController } from "./FindAllParticipantsByProjectIdController";
import { FindProjectByLeadIdCase } from "~/application/use-cases/projects/find-project-by-lead-id-case";
import { FindProjectByWorkspaceIdCase } from "~/application/use-cases/projects/find-project-by-workspace-id-case";
import { FindAllParticipantsByProjectIdCase } from "~/application/use-cases/projects/find-all-participants-by-project-id-case";
import { AddParticipantInProjectController } from "./AddParticipantInProjectController";
import { AddParticipantInProjectCase } from "~/application/use-cases/projects/add-participant-in-project-case";
import { RemoveParticipantInProjectController } from "./RemoveParticipantInProjectController";
import { RemoveParticipantInProjectCase } from "~/application/use-cases/projects/remove-participant-in-project-case";
import { RemoveProjectController } from "./RemoveProjectController";
import { RemoveProjectCase } from "~/application/use-cases/projects/remove-project-case";

const prismaProjectRepository = new PrismaProjectRepository();

//Use Cases
const createProjectCase = new CreateProjectCase(prismaProjectRepository);
const findProjectByIdCase = new FindProjectByIdCase(prismaProjectRepository);
const findProjectByLeadIdCase = new FindProjectByLeadIdCase(
  prismaProjectRepository,
);
const findProjectByWorkspaceIdCase = new FindProjectByWorkspaceIdCase(
  prismaProjectRepository,
);
const findAllParticipantsByProjectIdCase =
  new FindAllParticipantsByProjectIdCase(prismaProjectRepository);
const addParticipantInProjectCase = new AddParticipantInProjectCase(
  prismaProjectRepository,
);
const removeParticipantInProjectCase = new RemoveParticipantInProjectCase(
  prismaProjectRepository,
);
const removeProjectCase = new RemoveProjectCase(prismaProjectRepository);
// Controllers
const createProjectController = new CreateProjectController(createProjectCase);
const findProjectByIdController = new FindProjectByIdController(
  findProjectByIdCase,
);
const findProjectByLeadIdController = new FindProjectByLeadIdController(
  findProjectByLeadIdCase,
);
const findProjectByWorkspaceIdIdController =
  new FindProjectByWorkspaceIdController(findProjectByWorkspaceIdCase);
const findAllParticipantsByProjectIdController =
  new FindAllParticipantsByProjectIdController(
    findAllParticipantsByProjectIdCase,
  );
const addParticipantInProjectController = new AddParticipantInProjectController(
  addParticipantInProjectCase,
);
const removeParticipantInProjectController =
  new RemoveParticipantInProjectController(removeParticipantInProjectCase);
const removeProjectController = new RemoveProjectController(removeProjectCase);

export {
  createProjectController,
  findProjectByIdController,
  findProjectByLeadIdController,
  findProjectByWorkspaceIdIdController,
  findAllParticipantsByProjectIdController,
  addParticipantInProjectController,
  removeParticipantInProjectController,
  removeProjectController,
};
