import Joi from "@hapi/joi";
import { CreateCommentBody } from "../dtos/create-comment-body";

export default Joi.object<CreateCommentBody>({
  content: Joi.string().min(1).max(300).required(),
  userId: Joi.string().length(24).required(),
  taskId: Joi.string().length(24).required(),
});
