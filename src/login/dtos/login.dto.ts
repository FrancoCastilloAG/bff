import { IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'email param needs to be a string' })
  email: string;

  @IsString({ message: 'password param needs to be a string' })
  password: string;
}
