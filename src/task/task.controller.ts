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

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    this.taskService.getTask();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    this.taskService.createTask();
  }

  @Put(':id')
  updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param(':id') id: string) {
    this.taskService.updateTask();
  }

  @Delete(':id')
  deleteTask(@Param(':id') id: string) {
    this.taskService.deleteTask();
  }
}
