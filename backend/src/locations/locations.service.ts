import {Injectable, ForbiddenException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
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
    async create(dto: CreateLocationDto, userId: string): Promise<Location> {
        const created = new this.locationModel({
            ...dto,
            user: new Types.ObjectId(userId),
            date: new Date(),
        });
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
    async update(id: string, updateLocationDto: UpdateLocationDto, userId: string): Promise<number> {
        try {
            const objId = new mongoose.Types.ObjectId(id);
            
            // Überprüfen ob Location dem User gehört
            const location = await this.locationModel.findById(objId).exec();
            if (!location) {
                return 0;
            }
            
            if (location.user && location.user.toString() !== userId) {
                throw new ForbiddenException('Keine Berechtigung zum Bearbeiten dieser Location');
            }

            const result = await this.locationModel.updateOne(
                {_id: objId},
                {$set: updateLocationDto}
            ).exec();

            return result.modifiedCount;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            return 0;
        }
    }

    // Location löschen
    async remove(id: string, userId: string): Promise<number> {
        try {
            const objId = new mongoose.Types.ObjectId(id);
            
            // Überprüfen ob Location dem User gehört
            const location = await this.locationModel.findById(objId).exec();
            if (!location) {
                return 0;
            }
            
            if (location.user && location.user.toString() !== userId) {
                throw new ForbiddenException('Keine Berechtigung zum Löschen dieser Location');
            }
            
            const result = await this.locationModel.deleteOne({_id: objId}).exec();
            return result.deletedCount;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            return 0;
        }
    }
}