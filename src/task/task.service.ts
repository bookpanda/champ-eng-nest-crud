import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: { ...dto },
    });
    return task;
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.task.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateTaskDto) {
    return '';
  }

  async remove(id: number) {
    return '';
  }
}
