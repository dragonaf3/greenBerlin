import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseInterceptors,
    UploadedFile,
    HttpCode,

} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiConsumes,
    ApiBody,
} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';

import {LocationsService} from './locations.service';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
    constructor(private readonly locationsService: LocationsService) {
    }

    @Get()
    @ApiOperation({summary: 'Alle Locations abrufen'})
    @ApiResponse({
        status: 200,
        description: 'Liste aller Locations',
        type: [CreateLocationDto],
    })
    async findAll() {
        return this.locationsService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Eine Location nach ID abrufen'})
    @ApiResponse({
        status: 200,
        description: 'Die Location',
        type: CreateLocationDto,
    })
    async findOne(@Param('id') id: string) {
        return this.locationsService.findOne(id);
    }

    @Post()
    @ApiOperation({summary: 'Neue Location anlegen'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateLocationDto})
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() createLocationDto: CreateLocationDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            return this.locationsService.create(createLocationDto);
        }
        createLocationDto.image = `/uploads/${file.filename}`;
        return this.locationsService.create(createLocationDto);
    }

    @Put(':id')
    @ApiOperation({summary: 'Vorhandene Location aktualisieren'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: UpdateLocationDto})
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') id: string,
        @Body() updateLocationDto: UpdateLocationDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        if (file) updateLocationDto.image = `/uploads/${file.filename}`;
        return this.locationsService.update(id, updateLocationDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({summary: 'Location löschen'})
    @ApiResponse({status: 204, description: 'Location erfolgreich gelöscht'})
    async remove(@Param('id') id: string) {
        return this.locationsService.remove(id);
    }
}
