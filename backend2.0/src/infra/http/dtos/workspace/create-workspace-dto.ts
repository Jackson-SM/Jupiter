import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateWorkspaceDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  title: string;
}
