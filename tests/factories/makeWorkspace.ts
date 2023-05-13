import { Workspace } from "../../src/domain/entities/Workspaces/Workspace";
import { makeUser } from "./makeUser";

type Override = Partial<Workspace>;

export function makeWorkspace(override?: Override): Workspace {
  return new Workspace({
    title: "Desktop",
    description: "Desktop for projects",
    creatorId: makeUser().id,
    ...override,
  });
}
