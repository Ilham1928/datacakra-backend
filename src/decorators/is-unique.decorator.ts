// decorators/is-unique.decorator.ts
import { Validate } from 'class-validator';
import { IsUniqueConstraint } from '../validators/unique.validator';

export function IsUnique(entity: any, field: string) {
  return Validate(IsUniqueConstraint, [entity, field]);
}
