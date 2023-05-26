import Joi from "@hapi/joi";

export default Joi.object({
  title: Joi.string().min(1).max(40).required(),
  description: Joi.string().min(1).max(200).required(),
  projectId: Joi.string().length(24).required(),
});
