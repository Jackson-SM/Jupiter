import Joi from "@hapi/joi";
import { AddParticipantInProjectBody } from "../dtos/add-participant-in-project-body";

export default Joi.object<AddParticipantInProjectBody>({
  email: Joi.string().email().required(),
  projectId: Joi.string().length(24).required(),
}).options({ messages: { "string.email": "O Email deve ser válido." } });
