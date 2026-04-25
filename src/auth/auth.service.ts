// auth.service.ts
import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const exist = await this.repo.findOne({ where: { email: data.email } });
    if (exist) {
      throw new BadRequestException('Email sudah digunakan');
    }

    const hashed = await bcrypt.hash(data.password, 10);

    const user = this.repo.create({
      name: data.name,
      email: data.email,
      password: hashed,
      url: data.url,
    });

    return this.repo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) {
      throw new UnprocessableEntityException('User tidak ditemukan');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnprocessableEntityException('Password salah');
    }

    // payload JWT
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        url: user.url,
      },
    };
  }
}
