import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail(undefined, { message: 'invalid email' })
  email: string;

  @IsNotEmpty()
  @IsDefined()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'invalid password',
  })
  password: string;
}
