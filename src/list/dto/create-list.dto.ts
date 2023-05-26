import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto {
  @ApiProperty({
    default: 'Homework',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    default: 1,
  })
  @IsInt()
  @IsNotEmpty()
  order: number;
}
