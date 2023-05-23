import { CreateTaskCase } from "~/application/use-cases/tasks/create-task-case";
import { PrismaTaskRepository } from "~/infra/database/prisma/repositories/prisma-task-repository";
import { CreateTaskController } from "./CreateTaskController";
import { AddTaskResponsibleController } from "./AddTaskResponsibleController";
import { AddTaskResponsibleCase } from "~/application/use-cases/tasks/add-task-responsible-case";
import { FindTaskByResponsibleIdController } from "./FindTaskByResponsibleIdController";
import { FindTaskByResponsibleIdCase } from "~/application/use-cases/tasks/find-task-by-responsible-id-case";

const prismaTaskRepository = new PrismaTaskRepository();

// Cases
const createTaskCase = new CreateTaskCase(prismaTaskRepository);
const addTaskResponsibleCase = new AddTaskResponsibleCase(prismaTaskRepository);
const findTaskByResponsibleIdCase = new FindTaskByResponsibleIdCase(
  prismaTaskRepository,
);

// Controllers
const createTaskController = new CreateTaskController(createTaskCase);
const addTaskResponsibleController = new AddTaskResponsibleController(
  addTaskResponsibleCase,
);
const findTaskByResponsibleIdController = new FindTaskByResponsibleIdController(
  findTaskByResponsibleIdCase,
);

export {
  createTaskController,
  addTaskResponsibleController,
  findTaskByResponsibleIdController,
};
