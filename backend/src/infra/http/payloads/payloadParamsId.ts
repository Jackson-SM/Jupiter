import Joi from "@hapi/joi";

export default Joi.object({
  id: Joi.string().length(24).required(),
});
