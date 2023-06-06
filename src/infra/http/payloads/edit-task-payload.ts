import Joi from "@hapi/joi";
import { IEditTaskBody } from "../dtos/edit-task-body";

export default Joi.object<IEditTaskBody>({
  title: Joi.string().max(30),
  description: Joi.string().max(1000),
});
