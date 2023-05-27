import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateListDto, UpdateListDto } from 'src/list/dto';
import { ListService } from 'src/list/list.service';
import { PrismaService } from 'src/prisma';

describe('ListService Integration', () => {
  let prisma: PrismaService;
  let listService: ListService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    listService = moduleRef.get(ListService);
    await prisma.cleanDb();
  });

  let id: number;
  describe('create and find one', () => {
    const dto: CreateListDto = {
      title: 'Homework',
      order: 1,
    };
    it('should create a list', async () => {
      const list = await listService.create(dto);
      id = list.id;
      expect(list.title).toBe(dto.title);
      expect(list.order).toBe(dto.order);
    });

    it('should get a list', async () => {
      const list = await listService.findOne(id);
      expect(list.title).toBe(dto.title);
      expect(list.order).toBe(dto.order);
    });
  });

  describe('update and delete', () => {
    const dto: UpdateListDto = {
      title: 'Housework',
      order: 2,
    };
    it('should create a list', async () => {
      const list = await listService.update(id, dto);
      expect(list.title).toBe(dto.title);
      expect(list.order).toBe(dto.order);
    });

    it('should delete a list', async () => {
      await listService.remove(id);
      const list = await prisma.list.count({ where: { id } });
      expect(list).toBe(0);
    });
  });
});
