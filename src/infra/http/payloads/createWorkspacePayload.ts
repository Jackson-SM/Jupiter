import Joi from "@hapi/joi";
import { ICreateWorkspaceBody } from "../dtos/create-workspace-body";

export default Joi.object<ICreateWorkspaceBody>({
  title: Joi.string()
    .min(1)
    .required()
    .description("O Título deve ter no mínimo 1 caractere"),
  description: Joi.string()
    .max(200)
    .description("A descrição deve ter no máximo 200 caracteres"),
});
