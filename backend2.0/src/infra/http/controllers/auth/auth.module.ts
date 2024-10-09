import { Module } from '@nestjs/common';
import { AuthService } from '@src/application/security/auth.service';
import { JwtService } from '@src/application/security/jwt.service';
import { LoginUseCase } from '@src/application/use-cases/auth/login-use-case';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { ServiceTokenRepository } from '@src/domain/repositories/service-token-repository';
import { DatabaseModule } from '@src/infra/database/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    { provide: AuthenticationRepository, useClass: AuthService },
    { provide: ServiceTokenRepository, useClass: JwtService },
  ],
})
export class AuthModule {}
