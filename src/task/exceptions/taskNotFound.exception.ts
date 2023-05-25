import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor() {
    super('Task with id not found', HttpStatus.NOT_FOUND);
  }
}
