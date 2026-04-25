// links/link.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Guard } from '../auth/auth.guard';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';

@Controller('link')
@UseGuards(Guard)
export class LinkController {
  constructor(private readonly service: LinkService) {}

  @Post()
  create(@Body() data: CreateLinkDto) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateLinkDto) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
