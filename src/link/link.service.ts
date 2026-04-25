/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// links/link.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './link.entity';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private repo: Repository<Link>,
  ) {}

  create(data: CreateLinkDto, user: { sub: number }) {
    const link = this.repo.create({
      ...data,
      user: { id: user.sub },
    });

    return this.repo.save(link);
  }

  findAll(user: { sub: number }) {
    return this.repo.find({
      order: { id: 'DESC' },
      where: {
        user: { id: user.sub }, // 🔥 ini yang benar
      },
    });
  }

  async findOne(id: number) {
    const link = await this.repo.findOne({ where: { id } });
    if (!link) throw new NotFoundException('Link tidak ditemukan');
    return link;
  }

  async update(id: number, data: UpdateLinkDto) {
    const link = await this.findOne(id);
    Object.assign(link, data);
    return this.repo.save(link);
  }

  async remove(id: number) {
    const link = await this.findOne(id);
    return this.repo.remove(link);
  }
}
