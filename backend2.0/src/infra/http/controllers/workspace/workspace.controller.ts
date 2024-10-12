import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Payload } from '@src/application/types/Payload';
import { CreateWorkspaceUseCase } from '@src/application/use-cases/workspace/create-workspace-use-case';
import { DeleteWorkspaceUseCase } from '@src/application/use-cases/workspace/delete-workspace-use-case';
import { FindByIdUseCase } from '@src/application/use-cases/workspace/find-by-id-use-case';
import { Request } from 'express';
import { CreateWorkspaceDTO } from '../../dtos/workspace/create-workspace-dto';
import { JwtAuthGuard } from '../../guard/jwt-auth.guard';

@Controller('workspace')
export class WorkspaceController {
  constructor(
    private createWorkspaceUseCase: CreateWorkspaceUseCase,
    private deleteWorkspaceUseCase: DeleteWorkspaceUseCase,
    private findByIdUseCase: FindByIdUseCase,
  ) {}

  @Get(':id')
  async findById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.findByIdUseCase.execute({ id });
  }

  @Delete(':id')
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.deleteWorkspaceUseCase.execute({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateWorkspaceDTO, @Req() request: Request) {
    const { title } = body;
    const { id } = request.user as Payload;

    await this.createWorkspaceUseCase.execute({ title, ownerId: id });
  }
}
