import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongDateFormatException extends HttpException {
  constructor(date: string) {
    super(`"${date}" is a wrong Date format`, HttpStatus.BAD_REQUEST);
  }
}
