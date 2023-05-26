import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { ListNotFoundException } from 'src/list/exceptions/list-not-found.exception';

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
    const list = await this.prisma.list.findFirst({
      where: { id: dto.listID },
    });

    if (!list) {
      throw new ListNotFoundException(dto.listID);
    }
    const task = await this.prisma.task.update({
      where: { id },
      data: { ...dto },
    });
    return task;
  }

  async remove(id: number) {
    const task = await this.prisma.task.delete({ where: { id } });
    return task;
  }
}
