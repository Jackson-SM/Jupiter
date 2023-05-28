import Joi from "@hapi/joi";
import { ICreateGroupBody } from "../dtos/create-group-body";

export default Joi.object<ICreateGroupBody>({
  name: Joi.string().min(1).max(20).required(),
  projectId: Joi.string().length(24).required(),
});
