import { Workspace } from '../entities/workspace';

export abstract class WorkspaceRepository {
  abstract save(workspace: Workspace): Promise<Workspace>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Workspace>;
}
