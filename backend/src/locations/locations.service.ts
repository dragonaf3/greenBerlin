import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Location, LocationDocument} from './schemas/location.schema';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';
import {FileManagementService} from '../shared/utils/file-management.service';
import * as mongoose from 'mongoose';

@Injectable()
export class LocationsService {
    constructor(
        @InjectModel(Location.name)
        private readonly locationModel: Model<LocationDocument>,
    ) {}

    // Neue Location erstellen
    async create(dto: CreateLocationDto): Promise<Location> {
        const created = new this.locationModel(dto);
        return created.save();
    }

    // Alle Locations abrufen
    async findAll(): Promise<Location[]> {
        return this.locationModel.find().exec();
    }

    // Eine Location nach ID abrufen
    async findOne(id: string): Promise<Location | null> {
        try {
            const objId = new mongoose.Types.ObjectId(id);
            return this.locationModel.findOne({_id: objId}).exec();
        } catch (error) {
            return null;
        }
    }

    // Location aktualisieren
    async update(id: string, updateLocationDto: UpdateLocationDto, imagePath?: Express.Multer.File): Promise<number> {
        try {
            const objId = new mongoose.Types.ObjectId(id);

            // Wenn ein neues Bild hochgeladen wurde, füge es hinzu
            const updateData: any = {...updateLocationDto};
            if (imagePath) {
                updateData.image = imagePath;
            }

            const result = await this.locationModel.updateOne(
                {_id: objId},
                {$set: updateData}
            ).exec();

            return result.modifiedCount;
        } catch (error) {
            return 0;
        }
    }

    // Location löschen
    async remove(id: string): Promise<number> {
        try {
            const objId = new mongoose.Types.ObjectId(id);
            const result = await this.locationModel.deleteOne({_id: objId}).exec();
            return result.deletedCount;
        } catch (error) {
            return 0;
        }
    }
}