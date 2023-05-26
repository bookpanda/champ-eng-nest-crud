import { HttpException, HttpStatus } from '@nestjs/common';

export class ListNotFoundException extends HttpException {
  constructor(id: number) {
    super(`List with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
