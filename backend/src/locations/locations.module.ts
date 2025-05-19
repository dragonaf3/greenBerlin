import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

import { LocationsController } from './locations.controller';
import { LocationsService }    from './locations.service';
import { Location, LocationSchema } from './schemas/location.schema';

@Module({
    imports: [
        // Hier wird "LocationModel" als Provider registriert:
        MongooseModule.forFeature([
            { name: Location.name, schema: LocationSchema },
        ]),

        // Optional: File-Upload
        MulterModule.register({
            storage: diskStorage({
                destination: join(__dirname, '../../public/uploads'),
                filename: (_, file, cb) => {
                    const uid = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = file.originalname.split('.').pop();
                    cb(null, `${uid}.${ext}`);
                },
            }),
        }),
    ],
    controllers: [LocationsController],
    providers:   [LocationsService],
    exports:     [],  // musst Du hier nicht exportieren, da nur intern genutzt
})
export class LocationsModule {}
