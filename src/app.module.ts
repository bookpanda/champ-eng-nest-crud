import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task';
import { LoggerMiddleWare } from './logger.middleware';
import { TaskController } from './task/task.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TaskModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(TaskController);
  }
}
