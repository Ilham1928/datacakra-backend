/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// validators/is-unique.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [EntityClass, field] = args.constraints;

    const repo = this.dataSource.getRepository(EntityClass);

    const exist = await repo.findOne({
      where: { [field]: value },
    });

    return !exist;
  }

  defaultMessage(args: ValidationArguments) {
    const [, field] = args.constraints;
    return `${field} sudah digunakan`;
  }
}
