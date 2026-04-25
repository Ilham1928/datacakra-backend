// links/dto/link.dto.ts
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { OpenType } from './link.entity';

export class CreateLinkDto {
  @IsString()
  icon: string;

  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsEnum(OpenType)
  openType: OpenType;
}

export class UpdateLinkDto extends PartialType(CreateLinkDto) {}
