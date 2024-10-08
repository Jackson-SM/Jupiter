import { Workspace, WorkspaceProps } from '@src/domain/entities/workspace';

type Override = Partial<WorkspaceProps>;

export function makeWorkspace(override?: Override) {
  return new Workspace({
    title: 'Workspace test',
    ...override,
  });
}
