import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsString()
  dueDate: string;

  @IsString()
  order: string;
}
