import { CreateCommentCase } from "~/application/use-cases/comments/create-comment-case";
import { PrismaCommentRepository } from "~/infra/database/prisma/repositories/prisma-comment-repository";
import { CreateCommentController } from "./CreateCommentController";
import { FindCommentByIdCase } from "~/application/use-cases/comments/find-comment-by-id-case";
import { FindCommentByIdController } from "./FindCommentByIdController";
import { FindAllCommentsByTaskIdController } from "./FindAllCommentsByTaskIdController";
import { FindAllCommentsByTaskIdCase } from "~/application/use-cases/comments/find-all-comments-by-task-id-case";
import { FindAllCommentsByUserIdController } from "./FindAllCommentsByUserIdController";
import { FindAllCommentsByUserIdCase } from "~/application/use-cases/comments/find-all-comments-by-user-id-case";

const prismaCommentRepository = new PrismaCommentRepository();

// Use Cases
const createCommentCase = new CreateCommentCase(prismaCommentRepository);
const findCommentByIdCase = new FindCommentByIdCase(prismaCommentRepository);
const findAllCommentsByTaskIdCase = new FindAllCommentsByTaskIdCase(
  prismaCommentRepository,
);
const findAllCommentsByUserIdCase = new FindAllCommentsByUserIdCase(
  prismaCommentRepository,
);

// Controller
const createCommentController = new CreateCommentController(createCommentCase);
const findCommentByIdController = new FindCommentByIdController(
  findCommentByIdCase,
);
const findAllCommentsByTaskIdController = new FindAllCommentsByTaskIdController(
  findAllCommentsByTaskIdCase,
);
const findAllCommentsByUserIdController = new FindAllCommentsByUserIdController(
  findAllCommentsByUserIdCase,
);

export {
  createCommentController,
  findCommentByIdController,
  findAllCommentsByTaskIdController,
  findAllCommentsByUserIdController,
};
