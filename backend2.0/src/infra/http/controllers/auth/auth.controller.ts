import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginUseCase } from '@src/application/use-cases/auth/login-use-case';
import { Response } from 'express';
import { AuthenticationUserDTO } from '../../dtos/auth/authentication-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(
    @Body() body: AuthenticationUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body;

    const token = await this.loginUseCase.execute({ email, password });

    response.cookie('token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return { token };
  }
}
