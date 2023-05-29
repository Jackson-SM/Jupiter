import Joi from "@hapi/joi";

export default Joi.object({
  groupId: Joi.string().length(24).required(),
  taskId: Joi.string().length(24).required(),
});
