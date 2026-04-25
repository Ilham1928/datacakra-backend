import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { IsUnique } from '../decorators/is-unique.decorator';
import { User } from '../user/user.entity';

// auth.dto.ts
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsUnique(User, 'url')
  url: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
