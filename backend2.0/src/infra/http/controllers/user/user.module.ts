import { Module } from '@nestjs/common';
import { AuthService } from '@src/application/security/auth.service';
import { JwtService } from '@src/application/security/jwt.service';
import { FindByEmailUseCase } from '@src/application/use-cases/user/find-by-email-use-case';
import { SignUpUseCase } from '@src/application/use-cases/user/signup-use-case';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { DatabaseModule } from '@src/infra/database/database.module';
import { UserController } from './user.controller';
import { TokenProviderRepository } from '@src/domain/repositories/token-provider-repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    SignUpUseCase,
    FindByEmailUseCase,
    { provide: AuthenticationRepository, useClass: AuthService },
    { provide: TokenProviderRepository, useClass: JwtService },
  ],
})
export class UserModule {}
