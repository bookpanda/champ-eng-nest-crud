import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    default: 'Create a CRUD server',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    default: new Date().toISOString(),
  })
  @IsString()
  @IsOptional()
  dueDate: string;

  @ApiProperty({
    default: 1,
  })
  @IsInt()
  @IsNotEmpty()
  order: number;

  @ApiProperty({
    default: 1,
  })
  @IsInt()
  @IsNotEmpty()
  listID: number;
}
