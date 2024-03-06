import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  middleName: string;

  @IsDefined()
  @IsNotEmpty()
  lastName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'invalid email' })
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number or special character.',
  })
  password: string;

  @IsDefined()
  @IsNotEmpty()
  roles: string[];
}
