import Joi from "@hapi/joi";
import { ICreateProjectBody } from "../dtos/create-project-body";

export default Joi.object<ICreateProjectBody>({
  title: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).max(20).required(),
  leadId: Joi.string().length(24).required(),
  workspaceId: Joi.string().length(24).required(),
});
