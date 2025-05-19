import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Alle Benutzer finden' })
    @ApiResponse({ status: 200, description: 'Liste aller Benutzer' })
    @ApiResponse({ status: 404, description: 'Keine Benutzer gefunden' })
    async findAll() {
        try {
            const users = await this.usersService.findAll();
            if (!users || users.length === 0) {
                throw new HttpException('Users not found!', HttpStatus.NOT_FOUND);
            }
            return users;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException('Something is not right!!', HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @ApiOperation({ summary: 'Benutzer einloggen' })
    @ApiResponse({ status: 200, description: 'Benutzer erfolgreich angemeldet' })
    @ApiResponse({ status: 401, description: 'Falsche Zugangsdaten' })
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.usersService.findOne(
            loginUserDto.username,
            loginUserDto.password
        );

        if (!user) {
            throw new HttpException('Bad Login Credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    @Post('create')
    @ApiOperation({ summary: 'Neuen Benutzer anlegen' })
    @ApiResponse({ status: 201, description: 'Benutzer erfolgreich erstellt' })
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            const userId = await this.usersService.create(createUserDto);
            return { id: userId };
        } catch (error) {
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Benutzer löschen' })
    @ApiResponse({ status: 204, description: 'Benutzer erfolgreich gelöscht' })
    @ApiResponse({ status: 404, description: 'Benutzer nicht gefunden' })
    async remove(@Param('id') id: string) {
        const deleteCount = await this.usersService.remove(id);

        if (deleteCount === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return null;
    }
}