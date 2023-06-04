import Joi from "@hapi/joi";
import { IRmoveParticipantInProjectBody } from "../dtos/removeParticipantInProjectBody";

export default Joi.object<IRmoveParticipantInProjectBody>({
  projectId: Joi.string().length(24).required(),
  userId: Joi.string().length(24).required(),
});
