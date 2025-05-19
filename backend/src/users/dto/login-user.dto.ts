import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ description: 'Der Benutzername', example: 'johndoe' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: 'Das Passwort', example: 'password123' })
    @IsNotEmpty()
    @IsString()
    password: string;
}