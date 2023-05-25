import { CreateCommentCase } from "~/application/use-cases/comments/create-comment-case";
import { PrismaCommentRepository } from "~/infra/database/prisma/repositories/prisma-comment-repository";
import { CreateCommentController } from "./CreateCommentController";

const prismaCommentRepository = new PrismaCommentRepository();

// Use Cases
const createCommentCase = new CreateCommentCase(prismaCommentRepository);

// Controller
const createCommentController = new CreateCommentController(createCommentCase);

export { createCommentController };
