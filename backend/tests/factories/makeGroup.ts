import { Group } from "../../src/domain/entities/Group/Group";
import { makeProject } from "./makeProject";

type Override = Partial<Group>;

export function makeGroup(override?: Override): Group {
  return new Group({
    name: "backend",
    projectId: makeProject().id,
    ...override,
  });
}
