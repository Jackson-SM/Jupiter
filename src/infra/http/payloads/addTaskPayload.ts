import Joi from "@hapi/joi";

export default Joi.object({
  userId: Joi.string().length(24).required(),
  taskId: Joi.string().length(24).required(),
});
