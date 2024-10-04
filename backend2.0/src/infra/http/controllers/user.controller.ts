import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUser } from '@src/application/use-cases/create-user';
import { FindByEmail } from '@src/application/use-cases/find-by-email';
import { CreateUserDTO } from '../dtos/users/create-user-dto';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('/users')
export class UserController {
  constructor(
    private createUser: CreateUser,
    private findByEmail: FindByEmail,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateUserDTO) {
    const { email, firstName, lastName, password } = body;

    await this.createUser.execute({
      email,
      firstName,
      lastName,
      password,
    });
  }

  @Get(':email')
  async findEmail(@Param('email') email: string) {
    const { user } = await this.findByEmail.execute({ email });

    const userViewModel = UserViewModel.toHTTP(user);

    return userViewModel;
  }
}
