import { Module } from '@nestjs/common';
import { CreateWorkspaceUseCase } from '@src/application/use-cases/workspace/create-workspace-use-case';
import { DeleteWorkspaceUseCase } from '@src/application/use-cases/workspace/delete-workspace-use-case';
import { FindByIdUseCase } from '@src/application/use-cases/workspace/find-by-id-use-case';
import { DatabaseModule } from '@src/infra/database/database.module';
import { WorkspaceController } from './workspace.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [WorkspaceController],
  providers: [CreateWorkspaceUseCase, DeleteWorkspaceUseCase, FindByIdUseCase],
})
export class WorkspaceModule {}
