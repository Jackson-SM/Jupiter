import Joi from "@hapi/joi";
import { IMoveTaskInGroupBody } from "../dtos/move-task-in-group-body";

export default Joi.object<IMoveTaskInGroupBody>({
  groupId: Joi.string().length(24).required(),
});
