import { Module } from '@nestjs/common';
import { AuthService } from '@src/application/security/auth.service';
import { JwtService } from '@src/application/security/jwt.service';
import { SignIn } from '@src/application/use-cases/auth/sign-in';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { TokenProviderRepository } from '@src/domain/repositories/token-provider-repository';
import { DatabaseModule } from '@src/infra/database/database.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    SignIn,
    { provide: AuthenticationRepository, useClass: AuthService },
    { provide: TokenProviderRepository, useClass: JwtService },
  ],
})
export class AuthModule {}
