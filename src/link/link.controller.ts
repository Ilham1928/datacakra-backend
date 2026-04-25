/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  Req,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Guard } from '../auth/auth.guard';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';
import type { Request } from 'express';

@Controller('link')
@UseGuards(Guard)
export class LinkController {
  constructor(private readonly service: LinkService) {}

  @Post()
  create(@Body() data: CreateLinkDto, @Req() req: any) {
    return this.service.create(data, req.user);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.service.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() data: UpdateLinkDto) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
