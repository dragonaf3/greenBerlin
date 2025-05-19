import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) {}

    // Einen Benutzer mit Benutzername und Passwort finden
    async findOne(username: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ username, password }).exec();
        if (user) {
            const userObject = user.toObject();
            // @ts-ignore
            delete userObject.password;

            // Sicherstellen, dass name zurückgegeben wird
            // (fallback: username verwenden, wenn name nicht gesetzt ist)
            if (!userObject.name) {
                userObject.name = userObject.firstName || userObject.username;
            }

            return userObject;
        }
        return null;
    }

    // Alle Benutzer finden
    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();

        // Passwörter aus allen Benutzerobjekten entfernen
        return users.map(user => {
            const userObject = user.toObject();
            // @ts-ignore
            delete userObject.password;
            return userObject as User;
        });
    }

    // Neuen Benutzer erstellen
    async create(createUserDto: CreateUserDto): Promise<string> {
        const createdUser = new this.userModel(createUserDto);
        const savedUser = await createdUser.save();
        return (savedUser._id as mongoose.Types.ObjectId).toString();
    }

    // Benutzer löschen
    async remove(id: string): Promise<number> {
        try {
            const objId = new mongoose.Types.ObjectId(id);
            const result = await this.userModel.deleteOne({ _id: objId }).exec();
            return result.deletedCount;
        } catch (error) {
            return 0;
        }
    }
}