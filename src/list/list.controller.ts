import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto, UpdateListDto } from './dto';
import { ParseIdPipe, ValidationPipe } from 'src/pipes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lists')
@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  create(@Body(ValidationPipe) createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.listService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body(ValidationPipe) updateListDto: UpdateListDto,
  ) {
    return this.listService.update(id, updateListDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.listService.remove(id);
  }
}
