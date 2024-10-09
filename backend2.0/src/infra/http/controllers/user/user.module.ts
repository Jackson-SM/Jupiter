import { Module } from '@nestjs/common';
import { AuthService } from '@src/application/security/auth.service';
import { FindByEmail } from '@src/application/use-cases/user/find-by-email';
import { SignUpUser } from '@src/application/use-cases/user/signup-user';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { DatabaseModule } from '@src/infra/database/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    SignUpUser,
    FindByEmail,
    { provide: AuthenticationRepository, useClass: AuthService },
  ],
})
export class UserModule {}
