import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'Der Benutzername', example: 'johndoe' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: 'Das Passwort', example: 'password123' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'Die E-Mail-Adresse', example: 'john@example.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: 'Der Anzeigename', example: 'John Doe', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'Der Vorname', example: 'John', required: false })
    @IsOptional()
    @IsString()
    firstName?: string;

    @ApiProperty({ description: 'Der Nachname', example: 'Doe', required: false })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({ description: 'Die Rolle des Benutzers', example: 'user', required: false })
    @IsOptional()
    @IsString()
    role?: string;
}