import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SignInUseCase } from '@src/application/use-cases/auth/sign-in-use-case';
import { Response } from 'express';
import { AuthenticationUserDTO } from '../../dtos/auth/authentication-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: AuthenticationUserDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;

    const { access_token } = await this.signInUseCase.execute({
      email,
      password,
    });

    res.cookie('access_token', access_token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }
}
