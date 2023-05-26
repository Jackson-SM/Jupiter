import Joi from "@hapi/joi";
import { CreateUserBody } from "../dtos/create-user-body";

export default Joi.object<CreateUserBody>({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(20).required(),
});
