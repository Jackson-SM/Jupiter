import Joi from "@hapi/joi";
import { CreateUserBody } from "../dtos/create-user-body";

export default Joi.object<CreateUserBody>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
