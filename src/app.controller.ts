import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

export class CreateCatDto {
  name: string;
  age: string;
  breed: string;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // arbitrary method name
    return this.appService.getHello();
  }

  @Get('/kwai/:id')
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  getHelp(@Param('id') id: string): string {
    // arbitrary method name
    return id;
    // return this.appService.getHello();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'create cat';
  }
}
