import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ListModule } from './list';
import { TaskModule } from './task';
import { LoggerMiddleWare } from './logger.middleware';
import { TaskController } from './task/task.controller';
import { PrismaModule } from './prisma';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TaskModule,
    ListModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(TaskController);
  }
}
