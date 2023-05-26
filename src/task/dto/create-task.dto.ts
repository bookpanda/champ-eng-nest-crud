import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  dueDate: string;

  @IsInt()
  @IsNotEmpty()
  order: number;

  @IsInt()
  @IsNotEmpty()
  listID: number;
}
