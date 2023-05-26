import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateListDto) {
    const list = await this.prisma.list.create({
      data: { ...dto },
    });
    return list;
  }

  async findAll() {
    return await this.prisma.list.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.list.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, dto: UpdateListDto) {
    const list = await this.prisma.list.update({
      where: { id },
      data: { ...dto },
    });
    return list;
  }

  async remove(id: number) {
    const list = await this.prisma.list.delete({ where: { id } });
    return list;
  }
}
