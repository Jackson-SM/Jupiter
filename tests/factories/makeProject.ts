import { Project } from "../../src/domain/entities/Project/Project";
import { makeUser } from "./makeUser";
import { makeWorkspace } from "./makeWorkspace";

type Override = Partial<Project>;

export function makeProject(override?: Override): Project {
  return new Project({
    title: "new comment",
    description: "description of comment",
    leadId: makeUser().id,
    workspaceId: makeWorkspace().id,
    ...override,
  });
}
