import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'Benutzername', example: 'testuser' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Passwort', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}