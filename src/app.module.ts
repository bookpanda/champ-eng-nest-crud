import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListModule } from './list';
import { TaskModule } from './task';
import { LoggerMiddleWare } from './logger.middleware';
import { TaskController } from './task/task.controller';
import { PrismaModule } from './prisma';

@Module({
  imports: [TaskModule, PrismaModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes(TaskController);
  }
}
