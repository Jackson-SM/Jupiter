import { Workspace } from '@src/domain/entities/workspace';
import { UserRepository } from '@src/domain/repositories/user-repository';

export class InMemoryWorkspaceRepository {
  private workspaces: Workspace[] = [];

  constructor(private userRepository: UserRepository) {}
}
