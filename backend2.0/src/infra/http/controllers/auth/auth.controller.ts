import { Body, Controller, Post, Res } from '@nestjs/common';
import { SignIn } from '@src/application/use-cases/auth/sign-in';
import { Response } from 'express';
import { AuthenticationUserDTO } from '../../dtos/auth/authentication-user-dto';
import { UserViewModel } from '../../view-models/user-view-model';

@Controller('auth')
export class AuthController {
  constructor(private signIn: SignIn) {}

  @Post('login')
  async login(
    @Body() body: AuthenticationUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body;

    const { user, token } = await this.signIn.execute({
      email,
      password,
    });

    response.cookie('acess_token', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    const userViewModel = UserViewModel.toHTTP(user);

    return { ...userViewModel, token };
  }
}
