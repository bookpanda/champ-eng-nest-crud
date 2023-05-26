import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async getTasks() {
    return await this.prisma.task.findMany();
  }
  async getTask() {
    return '';
  }
  createTask() {
    return '';
  }
  updateTask() {
    return '';
  }
  deleteTask() {
    return '';
  }
}
