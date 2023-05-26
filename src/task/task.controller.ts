import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ParseIdPipe, ValidationPipe } from 'src/pipes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({
    description: 'Create a new Task from JSON.',
  })
  @Post()
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiOperation({
    description: 'Get all Tasks',
  })
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @ApiOperation({
    description: 'Get a Task with ID',
  })
  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @ApiOperation({
    description:
      'Update a Task of ID with JSON. Only changes the fields that are in the JSON.',
  })
  @Put(':id')
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiOperation({
    description: 'Delete a Task with ID',
  })
  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.taskService.remove(id);
  }
}
