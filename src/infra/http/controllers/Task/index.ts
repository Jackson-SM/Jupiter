import { CreateTaskCase } from "~/application/use-cases/tasks/create-task-case";
import { PrismaTaskRepository } from "~/infra/database/prisma/repositories/prisma-task-repository";
import { CreateTaskController } from "./CreateTaskController";
import { AddTaskResponsibleController } from "./AddTaskResponsibleController";
import { AddTaskResponsibleCase } from "~/application/use-cases/tasks/add-task-responsible-case";
import { FindTaskByResponsibleIdController } from "./FindTaskByResponsibleIdController";
import { FindTaskByResponsibleIdCase } from "~/application/use-cases/tasks/find-task-by-responsible-id-case";
import { FindTaskByIdController } from "./FindTaskByIdController";
import { FindTaskByIdCase } from "~/application/use-cases/tasks/find-task-by-id-case";
import { RemoveTaskController } from "./RemoveTaskController";
import { RemoveTaskCase } from "~/application/use-cases/tasks/remove-task-case";
import { DoneTaskController } from "./DoneTaskController";
import { DoneTaskCase } from "~/application/use-cases/tasks/done-task-case";
import { FindTaskByGroupIdController } from "./FindTaskByGroupIdController";
import { FindTaskByGroupIdCase } from "~/application/use-cases/tasks/find-task-by-group-id";

const prismaTaskRepository = new PrismaTaskRepository();

// Cases
const createTaskCase = new CreateTaskCase(prismaTaskRepository);
const addTaskResponsibleCase = new AddTaskResponsibleCase(prismaTaskRepository);
const findTaskByResponsibleIdCase = new FindTaskByResponsibleIdCase(
  prismaTaskRepository,
);
const findTaskByIdCase = new FindTaskByIdCase(prismaTaskRepository);
const removeTaskCase = new RemoveTaskCase(prismaTaskRepository);
const doneTaskCase = new DoneTaskCase(prismaTaskRepository);
const findTaskByGroupIdCase = new FindTaskByGroupIdCase(prismaTaskRepository);

// Controllers
const createTaskController = new CreateTaskController(createTaskCase);
const addTaskResponsibleController = new AddTaskResponsibleController(
  addTaskResponsibleCase,
);
const findTaskByResponsibleIdController = new FindTaskByResponsibleIdController(
  findTaskByResponsibleIdCase,
);
const findTaskByIdController = new FindTaskByIdController(findTaskByIdCase);
const removeTaskController = new RemoveTaskController(removeTaskCase);
const doneTaskController = new DoneTaskController(doneTaskCase);
const findTaskByGroupIdController = new FindTaskByGroupIdController(
  findTaskByGroupIdCase,
);

export {
  createTaskController,
  addTaskResponsibleController,
  findTaskByResponsibleIdController,
  findTaskByIdController,
  removeTaskController,
  doneTaskController,
  findTaskByGroupIdController,
};
