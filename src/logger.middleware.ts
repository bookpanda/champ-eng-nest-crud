import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class LoggerMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Task Request...');
    next();
  }
}

// export function logger(req: Request, res: Response, next: NextFunction) {
//   console.log('Task Request...');
//   next();
// }
