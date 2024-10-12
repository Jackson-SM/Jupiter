import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { WorkspaceModule } from './controllers/workspace/workspace.module';

@Module({
  imports: [UserModule, AuthModule, WorkspaceModule],
  controllers: [],
  providers: [],
  exports: [AuthModule],
})
export class HttpModule {}
