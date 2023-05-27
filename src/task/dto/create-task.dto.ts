import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    default: 'Create a CRUD server',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    default: new Date(),
  })
  @IsDate()
  @IsOptional()
  dueDate: Date;

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
