import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/createTaskDto';
import { UpdateTaskDto } from './dtos';

@Controller('tasks')
export class TaskController {
  @Get()
  getTasks() {
    return '';
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return id;
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return createTaskDto;
  }

  @Put(':id')
  updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param(':id') id: string) {
    return updateTaskDto + id;
  }

  @Delete(':id')
  deleteTask(@Param(':id') id: string) {
    return id;
  }
}
