import { Workspaces } from "../../src/domain/entities/Workspaces/Workspaces";
import { makeUser } from "./makeUser";

type Override = Partial<Workspaces>;

export function makeWorkspace(override?: Override): Workspaces {
  return new Workspaces({
    title: "Desktop",
    description: "Desktop for projects",
    creatorId: makeUser().id,
    ...override,
  });
}
