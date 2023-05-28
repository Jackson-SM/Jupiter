import Joi from "@hapi/joi";
import { IMoveTaskInGroupBody } from "../dtos/move-task-in-group-body";

export default Joi.object<IMoveTaskInGroupBody>({
  newGroupId: Joi.string().length(24).required(),
  taskId: Joi.string().length(24).required(),
});
