import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto, UpdateListDto } from './dto';
import { ParseIdPipe, ValidationPipe } from 'src/pipes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('lists')
@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @ApiOperation({
    description: 'Create a new List from JSON.',
  })
  @Post()
  create(@Body(ValidationPipe) createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @ApiOperation({
    description: 'Get all Lists',
  })
  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @ApiOperation({
    description: 'Get a List with ID',
  })
  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.listService.findOne(id);
  }

  @ApiOperation({
    description:
      'Update a List of ID with JSON. Only changes the fields that are in the JSON.',
  })
  @Put(':id')
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body(ValidationPipe) updateListDto: UpdateListDto,
  ) {
    return this.listService.update(id, updateListDto);
  }

  @ApiOperation({
    description: 'Delete a List with ID, and its Tasks',
  })
  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.listService.remove(id);
  }
}
