import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SignInUseCase } from '@src/application/use-cases/auth/sign-in-use-case';
import { AuthenticationRepository } from '@src/domain/repositories/auth-repository';
import { DatabaseModule } from '@src/infra/database/database.module';
import { AuthService } from '../../auth/auth.service';
import { JwtStrategy } from '../../auth/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRES_IN || '7d'}` },
    }),
  ],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    JwtStrategy,
    { provide: AuthenticationRepository, useClass: AuthService },
    AuthService,
  ],
  exports: [AuthenticationRepository],
})
export class AuthModule {}
