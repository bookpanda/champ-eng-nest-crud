import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // if (!metatype || !this.toValidate(metatype)) {
    if (!metatype) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const err = errors[0].constraints;
      const errMessage = err[Object.keys(err)[0]];

      throw new BadRequestException(errMessage);
    }
    return value;
  }

  //   private toValidate(metatype: Function): boolean {
  //     const types: Function[] = [String, Boolean, Number, Array, Object];
  //     return !types.includes(metatype);
  //   }
}
