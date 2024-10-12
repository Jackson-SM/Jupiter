import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindByEmailUseCase } from '@src/application/use-cases/user/find-by-email-use-case';
import { SignUpUseCase } from '@src/application/use-cases/user/signup-use-case';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { DatabaseModule } from '@src/infra/database/database.module';
import { AuthService } from '../../auth/auth.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    SignUpUseCase,
    FindByEmailUseCase,
    { provide: AuthenticationRepository, useClass: AuthService },
    JwtService,
  ],
})
export class UserModule {}
