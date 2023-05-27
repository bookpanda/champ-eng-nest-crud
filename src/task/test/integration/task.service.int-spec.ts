import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { CreateListDto } from 'src/list/dto';
import { ListService } from 'src/list/list.service';
import { PrismaService } from 'src/prisma';
import { CreateTaskDto, UpdateTaskDto } from 'src/task/dto';
import { TaskService } from 'src/task/task.service';

describe('TaskService Integration', () => {
  let prisma: PrismaService;
  let listService: ListService;
  let taskService: TaskService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    taskService = moduleRef.get(TaskService);
    listService = moduleRef.get(ListService);
    await prisma.cleanDb();
  });

  let listID_1: number;
  let listID_2: number;
  let taskID_1: number;
  let taskID_2: number;
  describe('create and find one', () => {
    it('should create a list (1)', async () => {
      const dto: CreateListDto = {
        title: 'Homework',
        order: 1,
      };
      const list = await listService.create(dto);
      listID_1 = list.id;
      expect(list.title).toBe(dto.title);
      expect(list.order).toBe(dto.order);
    });
    it('should create a list (2)', async () => {
      const dto: CreateListDto = {
        title: 'Write tests',
        order: 3,
      };
      const list = await listService.create(dto);
      listID_2 = list.id;
      expect(list.title).toBe(dto.title);
      expect(list.order).toBe(dto.order);
    });

    it('should create a task in list 1', async () => {
      const dto: CreateTaskDto = {
        description: 'Calculus II Paisarn',
        dueDate: 'today',
        order: 1,
        listID: listID_1,
      };
      const task = await taskService.create(dto);
      taskID_1 = task.id;
      expect(task.description).toBe(dto.description);
      expect(task.dueDate).toBe(dto.dueDate);
      expect(task.order).toBe(dto.order);
      expect(task.listID).toBe(dto.listID);
    });
    it('should create a task in list 2', async () => {
      const dto: CreateTaskDto = {
        description: 'Create tests for taskService',
        dueDate: 'tomorrow',
        order: 2,
        listID: listID_2,
      };
      const task = await taskService.create(dto);
      taskID_2 = task.id;
      expect(task.description).toBe(dto.description);
      expect(task.dueDate).toBe(dto.dueDate);
      expect(task.order).toBe(dto.order);
      expect(task.listID).toBe(dto.listID);
    });

    it('should get a task in list 1', async () => {
      const task = await taskService.findOne(taskID_1);
      expect(task.listID).toBe(listID_1);
    });
    it('should get a task in list 2', async () => {
      const task = await taskService.findOne(taskID_2);
      expect(task.listID).toBe(listID_2);
    });
  });

  describe('update task values', () => {
    let prevDueDate: string;
    let prevOrder: number;
    it('should update a task (update description, dueDate, order)', async () => {
      const dto: UpdateTaskDto = {
        description: 'Read Minano Nihongo',
        dueDate: 'anytime',
        order: 4,
      };
      const task = await taskService.update(taskID_1, dto);
      expect(task.description).toBe(dto.description);
      expect(task.dueDate).toBe(dto.dueDate);
      expect(task.order).toBe(dto.order);
      prevDueDate = task.dueDate;
      prevOrder = task.order;
    });
    it('should update a task (update description to empty)', async () => {
      const dto: UpdateTaskDto = {
        description: '',
      };
      const task = await taskService.update(taskID_1, dto);
      expect(task.description).toBe(dto.description);
      expect(task.dueDate).toBe(prevDueDate);
      expect(task.order).toBe(prevOrder);
    });
  });

  describe('move task to other lists', () => {
    it('should move task 1 to list 2', async () => {
      const dto: UpdateTaskDto = {
        description: 'Sleep',
        dueDate: 'now',
        order: 1,
        listID: listID_2,
      };
      const task = await taskService.update(taskID_1, dto);
      expect(task.description).toBe(dto.description);
      expect(task.dueDate).toBe(dto.dueDate);
      expect(task.order).toBe(dto.order);
      expect(task.listID).toBe(dto.listID);
      expect(await prisma.task.count({ where: { listID: listID_1 } })).toBe(0);
      expect(await prisma.task.count({ where: { listID: listID_2 } })).toBe(2);
    });
    it('should move task 2 to list 1', async () => {
      const dto: UpdateTaskDto = {
        listID: listID_1,
      };
      const task = await taskService.update(taskID_2, dto);
      expect(task.listID).toBe(dto.listID);
      expect(await prisma.task.count({ where: { listID: listID_1 } })).toBe(1);
      expect(await prisma.task.count({ where: { listID: listID_2 } })).toBe(1);
    });
    it('should move task 2 to list 2', async () => {
      const dto: UpdateTaskDto = {
        description: '',
        dueDate: '',
        listID: listID_2,
      };
      const task = await taskService.update(taskID_2, dto);
      expect(task.listID).toBe(dto.listID);
      expect(task.description).toBe(dto.description);
      expect(task.dueDate).toBe(dto.dueDate);
      expect(await prisma.task.count({ where: { listID: listID_1 } })).toBe(0);
      expect(await prisma.task.count({ where: { listID: listID_2 } })).toBe(2);
    });
  });

  describe('delete task and list', () => {
    it('should delete task 1', async () => {
      await taskService.remove(taskID_1);
      expect(await prisma.task.count({ where: { listID: listID_2 } })).toBe(1);
    });
    it('should delete a list 1', async () => {
      await listService.remove(listID_1);
      expect(await prisma.list.count({ where: { id: listID_1 } })).toBe(0);
      expect(await prisma.task.count({ where: { listID: listID_1 } })).toBe(0);
    });
    it('should delete a list 2', async () => {
      await listService.remove(listID_2);
      expect(await prisma.list.count({ where: { id: listID_2 } })).toBe(0);
      expect(await prisma.task.count({ where: { listID: listID_2 } })).toBe(0);
    });
  });
});
