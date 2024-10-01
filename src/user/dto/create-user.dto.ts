import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsInt()
  age: number;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  email: string;
}
