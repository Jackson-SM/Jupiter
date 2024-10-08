import { Module } from '@nestjs/common';
import { CreateUser } from '@src/application/use-cases/user/create-user';
import { FindByEmail } from '@src/application/use-cases/user/find-by-email';
import { DatabaseModule } from '@src/infra/database/database.module';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser, FindByEmail],
})
export class UserModule {}
