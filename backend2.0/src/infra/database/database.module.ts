import { Module } from '@nestjs/common';
import { UserRepository } from '@src/domain/repositories/user-repository';
import { WorkspaceRepository } from '@src/domain/repositories/workspace-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserService } from './prisma/repositories/prisma-user.service';
import { PrismaWorkspaceService } from './prisma/repositories/prisma-workspace.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserService,
    },
    {
      provide: WorkspaceRepository,
      useClass: PrismaWorkspaceService,
    },
  ],
  exports: [UserRepository, WorkspaceRepository],
})
export class DatabaseModule {}
